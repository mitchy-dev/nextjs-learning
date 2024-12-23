import {PropTypes} from "prop-types";
import classNames from 'classnames';

TodoItem.propTypes = { //propsの型定義、TS化の際に参考になる
  id: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
  text: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onShowEdit: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

export function TodoItem ({id, text, isDone, isEdit, onToggleDone, onShowEdit, onChangeText, onDeleteTask}) { //型に応じたpropsを渡す
  const classNameLi = classNames(
   'list__item', {
        'list__item--done': isDone
      });
  const classNameIcon = classNames(
    'fa', 'icon-check', {
         'fa-square-o': !isDone,
         'fa-check-square': isDone,
      });
  return (
      <li key={id} className={classNameLi}>
       {/*ToDo buttonタグの追加:iタグでbutton代用しているため*/}
        <i className={classNameIcon}
           aria-label="タスクの完了状態"
           onClick={() => onToggleDone(id, isDone)} />
        {isEdit ?
            <input
                type="text"
                defaultValue={text}
                onChange={(e) => onChangeText(id, e.target.value)}
                aria-label="タスク編集"
            /> :
            <span aria-label="タスクのテキスト"
                  onClick={() => onShowEdit(id)}>{text}</span>
          }
        <i className="fa fa-trash icon-trash"
           aria-label="タスク削除"
           onClick={() => onDeleteTask(id)} />
      </li>
  
  );
}