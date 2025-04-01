import {TodoItem} from "@/app/todo/_components/TodoItem";
import {todoListPropTypes} from "../types/props";

export function TodoList ({tasks, handlers, loading}) {
  if (loading) {
    return <div className="loading-container">loading...</div>;
  }
  return (
      <ul className="p-todo-list">
        {tasks.map(task => (
            <TodoItem
                task={task}
                key={task.id}
                handlers={handlers}
            />
        ))}
      </ul>
  );
}
TodoList.propTypes = todoListPropTypes;
