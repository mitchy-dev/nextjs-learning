import classNames from 'classnames';
import {todoInputPropTypes} from "../types/props";

export function TodoInput ({ onSubmit}) {
  return (
      <div className="form">
        <div className="inputArea">
          <label htmlFor="todo-input">タスクを作成</label>
          <input
              type="text"
              id="todo-input"
              className="inputText js-get-val"
              defaultValue=""
              placeholder="something todo task"
              onKeyUp={ onSubmit}
          />
          {/*{err}*/}
        </div>
      </div>
  );
}

TodoInput.propTypes = todoInputPropTypes;
