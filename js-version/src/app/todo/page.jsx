export default function Page() {
  return (
      <>
        <form className="form">
          <div className="inputArea">
            <input type="text" className="inputText js-get-val" defaultValue="" placeholder="sothing todo task" />
            <span className="error js-toggle-error">入力が空です</span>
          </div>
        </form>
        <div className="searchBox">
          <i className="fa fa-search searchBox__icon" aria-hidden="true" />
          <input type="text" className="searchBox__input js-search" defaultValue="" placeholder="something keyword"/>
        </div>
        <ul className="list js-todo-list">
          <li className="list__item">
            <i className="fa fa-circle-thin" aria-hidden="true"/>
            <input type="text" className="editText"/>
            <span></span>
            <i className="fa fa-trash icon-trash" aria-hidden="true"/>
          </li>
        </ul>
      </>
  );
}