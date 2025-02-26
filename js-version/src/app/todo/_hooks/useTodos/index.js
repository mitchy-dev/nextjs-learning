import {deleteTodo, updateTodo} from "@/lib/todos";

export const useTodoHandlers = (tasks, setTasks) => {
  
  async function handleToggleDone(id, isDone) {
    try {
      const updatedTodo = await updateTodo(id, { isDone: !isDone,});
      setTasks(tasks.map((task) =>
          task.id === id ? updatedTodo : task
      ));
    } catch (e) {
      console.error('Failed to toggle todo:', e);
    }
  }
  function handleShowEdit(id) {
    setTasks(tasks.map((task) =>
        task.id === id ? {...task, isEdit: true} : { ...task, isEdit: false}
    ));
  }
  function handleChangeText(id, text) {
    setTasks(tasks.map((task) => task.id === id ? {...task,  text: text} : task));
  }
  async function handleRemoveTask(id) {
    try {
      await deleteTodo(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (e) {
      console.error('Failed to delete todo:', e);
    
    }
  }
  function handleCloseEdit(id) {
    setTasks(tasks.map((task) => ({...task, isEdit: false})));
  }
  async function handleConfirmEdit(event, id) {
    if (event.key === 'Enter') {
      try {
        const targetTask = tasks.find((task) => task.id === id);
        const updatedTodo = await updateTodo(id, { text: targetTask.text});
        setTasks(tasks.map(task => task.id === id ? updatedTodo : task));
      } catch (e) {
        console.error('Failed to update todo text:', e);
      }
    }
  }
  
  return {
    onToggleDone: handleToggleDone,
    onShowEdit: handleShowEdit,
    onChangeText: handleChangeText,
    onRemoveTask: handleRemoveTask,
    onConfirmEdit: handleConfirmEdit
  };
};