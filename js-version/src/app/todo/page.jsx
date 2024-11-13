import classNames from 'classnames';
export default function Page() {
  const classNameLi = classNames(
'list__item', {
     'list__item--done': true
  });
  const classNameIcon = classNames(
   'fa', {
        'fa-circle-thin': true,
        'fa-check-circle': true,
        'icon-check': true
  });
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
          <li className={classNameLi}>
            <i className={classNameIcon} aria-hidden="true"/>
            <input type="text" className="editText"/>
            <span></span>
            <i className="fa fa-trash icon-trash" aria-hidden="true"/>
          </li>
        </ul>
      </>
  );
}