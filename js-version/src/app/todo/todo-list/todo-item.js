import {PropTypes} from "prop-types";

TodoItem.propTypes = { //propsの型定義、TS化の際に参考になる
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onShowEdit: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
}

export function TodoItem ({id, text, isDone, isEdit, onToggleDone, onShowEdit, onChangeText}) { //型に応じたpropsを渡す
  return (
      <div>
        {/*呼出*/}
        <span aria-label="タスクのテキスト"
          onClick={() => onShowEdit(id, isEdit)}>{text}</span>
        <i aria-label="タスクの完了状態"
            onClick={() => onToggleDone(id, isDone)}></i>
        <label htmlFor="todo-input">タスクを作成</label>
        <input
            type="text"
            defaultValue={text}
            onChange={(e) => onChangeText(id, e.target.value)}
            aria-label="タスク編集"
        />
      </div>
  );
}