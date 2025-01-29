import {useTranslations} from "next-intl";


import {todoInputPropTypes} from "../types/props";

export function TodoInput ({ onSubmit}) {
  const t = useTranslations('TodoInput');
  return (
      <div className="p-form">
        <div className="p-form__input-area">
          <label htmlFor="todo-input" className="u-visually-hidden">{t('label')}</label>
          <input
              type="text"
              id="todo-input"
              className="c-input"
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
