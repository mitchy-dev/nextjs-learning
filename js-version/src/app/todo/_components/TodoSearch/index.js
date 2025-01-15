import {todoSearchPropTypes} from "../types/props";
export function TodoSearch ({ defaultValue, onChange }) {
  
  return (
      <div className="searchBox">
        <i className="fa fa-search searchBox__icon" aria-hidden="true"/>
        <label htmlFor="todo-search">タスクを検索</label>
        <input type="text"
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
