"use client";

import {useState} from "react";
import {TodoList} from "@/app/todo/_components/TodoList";
import {useTodoHandlers} from "@/app/todo/_hooks/useTodos/index";
import {TodoInput} from "@/app/todo/_components/TodoInput";


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
  
  const handlers = useTodoHandlers(tasks, setTasks);
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
        <TodoInput onAddTask={handleAddTask} />
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
        <TodoList
             // todo 検索機能実装後にvisibleTasksに変更
            tasks={tasks}
            handlers={handlers}
        />
      </>
  );
}