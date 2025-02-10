"use client";

import {useEffect, useState} from "react";
import {TodoList} from "@/app/todo/_components/TodoList";
import {useTodoHandlers} from "@/app/todo/_hooks/useTodos";
import {TodoInput} from "@/app/todo/_components/TodoInput";
import {TodoSearch} from "@/app/todo/_components/TodoSearch";
import {fetchTodos} from "@/lib/todos";


export default function Page() {
  const [keyword, setKeyword] = useState("");
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    loadTodos();
  }, []);
  
  async function loadTodos() {
    try {
      const todos = await fetchTodos();
      setTasks(todos);
    } catch (e) {
      console.error(e);
    }
  }
  
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