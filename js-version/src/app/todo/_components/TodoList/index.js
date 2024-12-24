import PropTypes from "prop-types";

import {TodoItem, todoItemPropTypes} from "@/app/todo/_components/TodoItem";

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(todoItemPropTypes.task).isRequired,
  onToggleDone: todoItemPropTypes.onToggleDone,
  onShowEdit: todoItemPropTypes.onShowEdit,
  onChangeText: todoItemPropTypes.onChangeText,
  onDeleteTask: todoItemPropTypes.onDeleteTask,
}
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