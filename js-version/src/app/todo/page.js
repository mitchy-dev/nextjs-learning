"use client";

import classNames from 'classnames';
import {useState} from "react";
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
    console.log(text);
  }
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
          {visibleTasks.map((task) => {
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
                <li key={task.id} className={classNameLi}>
                  <i className={classNameIcon}
                     aria-hidden="true"
                     aria-label="タスクの完了状態"
                     onClick={() => handleToggleDone(task.id, task.isDone)}/>
                  {task.isEdit ?
                      <input type="text"
                             className="editText js-todo_list-editForm"
                             defaultValue={task.text}
                             onChange={(e) => onChangeText(task.id, e.target.value)}
                             onKeyUp={(e) => confirmEdit(e, task.id)}
                      />
                      : <span className="js-todo_list-text"
                              aria-label="タスク名"
                              onClick={() => handleShowEdit(task.id)}>{task.text}</span>
                  }
                  <i className="fa fa-trash icon-trash"
                     aria-hidden="true"
                     onClick={() => handleRemoveTask(task.id)}/>
                </li>
            )})}
        </ul>
      </>
  );
}