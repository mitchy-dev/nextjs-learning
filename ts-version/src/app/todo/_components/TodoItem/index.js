import { Square, SquareCheck, Trash2 } from 'lucide-react';

import classNames from 'classnames';
import {useTranslations} from 'next-intl';
import {todoItemPropTypes} from "../types/props";

export function TodoItem ({task, handlers}) { //型に応じたpropsを渡す
  const {id, text, isDone, isEdit} = task;
  const {onToggleDone, onShowEdit, onChangeText, onRemoveTask, onConfirmEdit,} = handlers;
  
  const t = useTranslations('TodoItem');
  const classNameLi = classNames(
   'p-todo-item', {
        'is-done': isDone
      });
  const CheckBoxIcon = isDone ? SquareCheck : Square;
  return (
      <li key={id} className={classNameLi}>
        <button
          type="button"
          className="c-icon-button"
          aria-label={t('completeLabel')}
          onClick={() => onToggleDone(id, isDone)}
        >
          <CheckBoxIcon className={isDone ? "c-icon c-icon--check" : "c-icon c-icon--square"}/>
        </button>
        {isEdit ?
            <input
                type="text"
                className="c-edit-input"
                defaultValue={text}
                aria-label={t('editLabel')}
                onChange={(e) => onChangeText(id, e.target.value)}
                onKeyUp={(e) => onConfirmEdit(e, id)}
            /> :
            <span
                aria-label={t('textLabel')}
                onClick={() => onShowEdit(id)}
            >{text}</span>
        }
        <button
          type="button"
          className="c-icon-button p-todo-item__delete-button"
          aria-label={t('deleteLabel', {id})}
          onClick={() => onRemoveTask(id)}
        >
          <Trash2 className="c-icon c-icon--trash"/>
        </button>
      </li>
  
  );
}

TodoItem.propTypes = todoItemPropTypes;

// リファクタリングの順番
// テストへの影響が小さいものから着手
// 文言　＞　アイコン　＞　button実装
