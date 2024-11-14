"use client";

import classNames from 'classnames';
import {useState} from "react";
export default function Page() {
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

  return (
      <>
        <form className="form">
          <div className="inputArea">
            <input type="text" className="inputText js-get-val" defaultValue="" placeholder="sothing todo task" />
            <span className="error js-toggle-error">入力が空です</span>
          </div>
        </form>
        <div className="searchBox">
          <i className="fa fa-search searchBox__icon" aria-hidden="true" />
          <input type="text" className="searchBox__input js-search" defaultValue="" placeholder="something keyword"/>
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
                <input type="text" className="editText"/>
                <span>{task.text}</span>
                <i className="fa fa-trash icon-trash" aria-hidden="true"/>
              </li>
            </div>
          )})}
        </ul>
      </>
  );
}