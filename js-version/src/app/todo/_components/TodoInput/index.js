import {useTranslations} from "next-intl";


import {todoInputPropTypes} from "../types/props";

export function TodoInput ({ onSubmit}) {
  const t = useTranslations('TodoInput');
  return (
      <div className="form">
        <div className="inputArea">
          <label htmlFor="todo-input" className="visually-hidden">{t('label')}</label>
          <input
              type="text"
              id="todo-input"
              className="inputText js-get-val"
              defaultValue=""
              placeholder={t('placeholder')}
              onKeyUp={ onSubmit}
          />
          {/*{err}*/}
        </div>
      </div>
  );
}

TodoInput.propTypes = todoInputPropTypes;
