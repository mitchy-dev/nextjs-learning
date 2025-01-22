import classNames from 'classnames';
import {todoItemPropTypes} from "../types/props";
import PropTypes from "prop-types";

export function TodoItem ({task, handlers}) { //型に応じたpropsを渡す
  const {id, text, isDone, isEdit} = task;
  const {onToggleDone, onShowEdit, onChangeText, onRemoveTask, onConfirmEdit,} = handlers;
  const classNameLi = classNames(
   'list__item', {
        'is-done': isDone
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
                aria-label="タスク編集"
                onChange={(e) => onChangeText(id, e.target.value)}
                onKeyUp={(e) => onConfirmEdit(e, id)}
            /> :
            <span aria-label="タスクのテキスト"
                  onClick={() => onShowEdit(id)}>{text}</span>
          }
        <i className="fa fa-trash icon-trash"
           aria-label={`タスク削除${id}`}
           onClick={() => onRemoveTask(id)} />
      </li>
  
  );
}

TodoItem.propTypes = todoItemPropTypes;
