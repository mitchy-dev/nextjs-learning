"use client";

import classNames from 'classnames';
import {useState} from "react";
export default function Page() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'todo1',
      isEdit: true,
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
    console.log(text);
  }
// addTask
  function handleRemoveTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function onCloseEdit(id) {
    setTasks(tasks.map((task) => ({...task, isEdit: false})));
  }
  function confirmEdit(event, taskId) {
    if (event.keyCode === 13 && event.shiftKey === true) {
      onCloseEdit(taskId);
      onCloseEdit(taskId);
    }
  }
  return (
      <>
        <form className="form">
          <div className="inputArea">
            <input
                type="text"
                className="inputText js-get-val"
                defaultValue=""
                placeholder="sothing todo task"
            />
            <span className="error js-toggle-error">入力が空です</span>
          </div>
        </form>
        <div className="searchBox">
          <i className="fa fa-search searchBox__icon" aria-hidden="true" />
          <input type="text"
                 className="searchBox__input js-search"
                 defaultValue=""
                 placeholder="something keyword"
          />
        </div>
        <ul className="list js-todo-list">
          {tasks.map((task) => {
            const classNameLi = classNames(
            'list__item', {
                 'list__item--done': task.isDone
                });
            const classNameIcon = classNames(
                'fa', {
                  'fa-square-o': !task.isDone,
                  'fa-check-square': task.isDone,
                  'icon-check': true
                });
            return (
            <div key={task.id}>
              <li className={classNameLi}>
                <i className={classNameIcon} aria-hidden="true"
                    onClick={() => handleToggleDone(task.id, task.isDone)}/>
                {task.isEdit ?
                  <input type="text"
                         className="editText js-todo_list-editForm"
                         defaultValue={task.text}
                         onChange={(e) => onChangeText(task.id, e.target.value)}
                         onKeyUp={(e) => confirmEdit(e, task.id)}
                  />
                  : <span className="js-todo_list-text"
                          onClick={() => handleShowEdit(task.id)}>{task.text}</span>
                }
                <i className="fa fa-trash icon-trash"
                   aria-hidden="true"
                    onClick={() => handleRemoveTask(task.id)}/>
              </li>
            </div>
          )})}
        </ul>
      </>
  );
}