import {updateTodo} from "@/lib/todos";

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
  function handleRemoveTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function handleCloseEdit(id) {
    setTasks(tasks.map((task) => ({...task, isEdit: false})));
  }
  function handleConfirmEdit(event, taskId) {
    if (event.key === 'Enter') {
      handleCloseEdit(taskId);
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