import {TodoItem} from "@/app/todo/_components/TodoItem";
import {todoListPropTypes} from "../types/props";

export function TodoList ({tasks, handlers}) {
  return (
      <ul className="list">
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
