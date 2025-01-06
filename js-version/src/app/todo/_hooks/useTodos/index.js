export const useTodoHandlers = (tasks, setTasks) => {
  function handleToggleDone(id, isDone) {
    setTasks(tasks.map((task) =>
        task.id === id ? {...task, isDone: !isDone} : task
    ));
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