"use client";

import classNames from 'classnames';
import {useState} from "react";
import {TodoItem} from "@/app/todo/_components/TodoItem";
export default function Page() {
  const [keyword, setKeyword] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'todo1',
      isEdit: false,
      isDone: false,
    },{
      id: 2,
      text: 'todo2',
      isEdit: false,
      isDone: true,
    },
  ]);
  
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
  function onChangeText(id, text) {
    setTasks(tasks.map((task) => task.id === id ? {...task,  text: text} : task));
  }
  function handleRemoveTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function onCloseEdit(id) {
    setTasks(tasks.map((task) => ({...task, isEdit: false})));
  }
  function confirmEdit(event, taskId) {
    if (event.key === 'Enter' && event.shiftKey === true) {
      onCloseEdit(taskId);
    }
  }
  function onAddTask(text) {
    setTasks([...tasks, {
      id: Date.now(),
      text: text,
      isEdit: false,
      isDone: false,
    }]);
  }
  function handleAddTask(event) {
    if (event.key === 'Enter') {
      onAddTask(event.target.value);
    }
  }
  function searchTask(task) {
    const regexp = new RegExp('^' + keyword, 'i');
    return task.text.match(regexp)
  }
  
  const visibleTasks = keyword ==='' ? tasks : tasks.filter((task) => searchTask(task));
  return (
      <>
        <div className="form">
          <div className="inputArea">
            <label htmlFor="todo-input">タスクを作成</label>
              <input
                  type="text"
                  id="todo-input"
                  className="inputText js-get-val"
                  defaultValue=""
                  placeholder="something todo task"
                  onKeyUp={handleAddTask}
              />
            {/*{err}*/}
          </div>
        </div>
        <div className="searchBox">
          <i className="fa fa-search searchBox__icon" aria-hidden="true" />
          <label htmlFor="todo-search">タスクを検索</label>
          <input type="text"
                 id="todo-search"
                 className="searchBox__input js-search"
                 defaultValue={keyword}
                 placeholder="something keyword"
                 onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <ul className="list js-todo-list">
          {visibleTasks.map((task) => (
            <TodoItem
                onToggleDone={handleToggleDone}
                onDeleteTask={handleRemoveTask}
                onChangeText={onChangeText}
                onShowEdit={handleShowEdit}
                key={task.id}
                isEdit={task.isEdit}
                id={task.id} text={task.text} isDone={task.isDone}
            />
            )
          )}
        </ul>
      </>
  );
}