import { Square, SquareCheck, Trash2 } from 'lucide-react';

import classNames from 'classnames';
import {useTranslations} from 'next-intl';
import {todoItemPropTypes} from "../types/props";

export function TodoItem ({task, handlers}) { //型に応じたpropsを渡す
  const {id, text, isDone, isEdit} = task;
  const {onToggleDone, onShowEdit, onChangeText, onRemoveTask, onConfirmEdit,} = handlers;
  
  const t = useTranslations('TodoItem');
  const classNameLi = classNames(
   'list__item', {
        'is-done': isDone
      });
  return (
      <li key={id} className={classNameLi}>
       {/*ToDo buttonタグの追加:iタグでbutton代用しているため*/}
        {isDone ?
          <SquareCheck
            className="icon-check"
            aria-label={t('completeLabel')}
            onClick={() => onToggleDone(id, isDone)}
          /> :
          <Square
            className="icon-square"
            aria-label={t('completeLabel')}
            onClick={() => onToggleDone(id, isDone)}
          />
        }
        {isEdit ?
            <input
                type="text"
                defaultValue={text}
                aria-label={t('editLabel')}
                onChange={(e) => onChangeText(id, e.target.value)}
                onKeyUp={(e) => onConfirmEdit(e, id)}
            /> :
            <span aria-label={t('textLabel')}
                  onClick={() => onShowEdit(id)}>{text}</span>
          }
        <Trash2
          className="icon-trash"
          aria-label={t('deleteLabel', {id})}
          onClick={() => onRemoveTask(id)}
        />
      </li>
  
  );
}

TodoItem.propTypes = todoItemPropTypes;

// リファクタリングの順番
// テストへの影響が小さいものから着手
// 文言　＞　アイコン　＞　button実装
