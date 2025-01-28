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
  const classNameIcon = classNames(
    //   todo lucideに変更
    'fa', 'icon-check', {
         'fa-square-o': !isDone,
         'fa-check-square': isDone,
      });
  return (
      <li key={id} className={classNameLi}>
       {/*ToDo buttonタグの追加:iタグでbutton代用しているため*/}
        {/* todo 文言をja.jsonに移行 */}
        <i className={classNameIcon}
           aria-label={t('completeLabel')}
           onClick={() => onToggleDone(id, isDone)} />
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
        {/*  todo lucideに変更に変更 */}
        <i className="fa fa-trash icon-trash"
           aria-label={t('deleteLabel', {id})}
           onClick={() => onRemoveTask(id)} />
      </li>
  
  );
}

TodoItem.propTypes = todoItemPropTypes;

// リファクタリングの順番
// テストへの影響が小さいものから着手
// 文言　＞　アイコン　＞　button実装
