import PropTypes from "prop-types";

import {TodoItem} from "@/app/todo/_components/TodoItem";
import {todoListPropTypes} from "../types/props";

export function TodoList ({tasks, onToggleDone, onShowEdit, onChangeText, onDeleteTask}) {
  return (
      <ul className="list js-todo-list">
        {tasks.map(task => (
            <TodoItem
                task={task}
                key={task.id}
                onToggleDone={onToggleDone}
                onShowEdit={onShowEdit}
                onChangeText={onChangeText}
                onDeleteTask={onDeleteTask}
            />
        ))}
      </ul>
  );
}
TodoList.propTypes = todoListPropTypes;
