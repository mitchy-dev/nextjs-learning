import {Search} from "lucide-react";
import {useTranslations} from 'next-intl';

import {todoSearchPropTypes} from "../types/props";
export function TodoSearch ({ defaultValue, onChange }) {
  const t = useTranslations('TodoSearch');
  return (
      <div className="searchBox">
        <Search className="searchBox__icon" aria-hidden="true" />
        <label htmlFor="todo-search" className="visually-hidden">{t('label')}</label>
        <input type="search"
               id="todo-search"
               className="searchBox__input js-search"
               defaultValue={defaultValue}
               placeholder={t('placeholder')}
               onChange={(e) => onChange(e.target.value)}
        />
      </div>
  );
}
TodoSearch.propTypes = todoSearchPropTypes;
