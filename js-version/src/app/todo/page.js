"use client";

import {useState} from "react";
import {TodoList} from "@/app/todo/_components/TodoList";
import {useTodoHandlers} from "@/app/todo/_hooks/useTodos";
import {TodoInput} from "@/app/todo/_components/TodoInput";
import {TodoSearch} from "@/app/todo/_components/TodoSearch";


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
  function addTask(text) {
    setTasks([...tasks, {
      id: Date.now(),
      text: text,
      isEdit: false,
      isDone: false,
    }]);
  }
  function handleSubmit(event) {
    if (event.key === 'Enter') {
      addTask(event.target.value);
    }
  }
  function searchTask(task) {
    const regexp = new RegExp('^' + keyword, 'i');
    return task.text.match(regexp);
  }
  
  
  const visibleTasks = keyword ==='' ? tasks : tasks.filter((task) => searchTask(task));
  return (
      <>
        <TodoInput onSubmit={handleSubmit} />
        <TodoSearch onChange={setKeyword} defaultValue={keyword} />
        <TodoList
            tasks={visibleTasks}
            handlers={handlers}
        />
      </>
  );
}