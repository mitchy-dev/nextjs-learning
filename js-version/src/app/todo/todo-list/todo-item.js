import {PropTypes} from "prop-types";

TodoItem.propTypes = { //propsの型定義、TS化の際に参考になる
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  onToggleDone: PropTypes.func.isRequired,
}

export function TodoItem ({id, text, isDone, onToggleDone}) { //型に応じたpropsを渡す
  return (
      <div>
        <h1>{text}</h1> //呼出
        <i aria-label="タスクの完了状態"
            onClick={() => onToggleDone(id, isDone)}></i>
      </div>
  );
}