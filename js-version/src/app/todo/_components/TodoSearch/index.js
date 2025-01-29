import {Search} from "lucide-react";
import {useTranslations} from 'next-intl';

import {todoSearchPropTypes} from "../types/props";
export function TodoSearch ({ defaultValue, onChange }) {
  const t = useTranslations('TodoSearch');
  return (
      <div className="p-search-box">
        <Search className="p-search-box__icon" aria-hidden="true" />
        <label htmlFor="todo-search" className="u-visually-hidden">{t('label')}</label>
        <input type="search"
               id="todo-search"
               className="p-search-box__input"
               defaultValue={defaultValue}
               placeholder={t('placeholder')}
               onChange={(e) => onChange(e.target.value)}
        />
      </div>
  );
}
TodoSearch.propTypes = todoSearchPropTypes;
