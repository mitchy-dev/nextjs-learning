import {todoSearchPropTypes} from "../types/props";
import {Search} from "lucide-react";
export function TodoSearch ({ defaultValue, onChange }) {
  
  return (
      <div className="searchBox">
        <Search className="searchBox__icon" aria-hidden="true" />
        <label htmlFor="todo-search" className="visually-hidden">タスクを検索</label>
        <input type="search"
               id="todo-search"
               className="searchBox__input js-search"
               defaultValue={defaultValue}
               placeholder="something keyword"
               onChange={(e) => onChange(e.target.value)}
        />
      </div>
  );
}
TodoSearch.propTypes = todoSearchPropTypes;
