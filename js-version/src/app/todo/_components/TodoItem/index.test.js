import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropTypes from "prop-types";

import {createMockTodoItemProps} from "@/tests/factories/todo";
import {TodoItem} from "./index";
import {taskPropType, taskShape, todoHandlersPropTypes} from "@/app/todo/_components/types/props";

describe("タスクコンポーネント", () => {
  let rerender;
  
  beforeEach(() => {
    const result = render(<TodoItem {...createMockTodoItemProps()} />); //型に応じたモックデータを渡す
    rerender = result.rerender;
  });
  test("モックデータの型チェック", () => {
    const mockProps = createMockTodoItemProps();
     expect(PropTypes.checkPropTypes(
     { task: taskPropType },
        { task: mockProps.task },
       'prop',
'TodoItem'
      )).toBeUndefined();
     expect(PropTypes.checkPropTypes(
     { handlers: todoHandlersPropTypes,},
        { handlers: mockProps.handlers,},
       'prop'
     )).toBeUndefined();
  });
  test("初期表示", () => {
    expect(screen.getByText(createMockTodoItemProps().task.text)).toBeInTheDocument(); //呼出チェック
  });
  test("未完了のタスクをクリック：完了状態になる", async () => {
    const checkIcon = screen.getByLabelText('タスクの完了状態');
    const user = userEvent.setup();
    await user.click(checkIcon);
    expect(createMockTodoItemProps().handlers.onToggleDone).toHaveBeenCalledWith(createMockTodoItemProps().task.id, createMockTodoItemProps().task.isDone); //呼出チェック、h1とは異なりユーザーイベントが事前に必要
  });
  test("タスクをクリック：編集モードになる", async () => {
   const displayElement = screen.getByLabelText('タスクのテキスト');
   const user = userEvent.setup();
   await user.click(displayElement);
   expect(createMockTodoItemProps().handlers.onShowEdit).toHaveBeenCalledWith(createMockTodoItemProps().task.id); //呼出チェック、h1とは異なりユーザーイベントが事前に必要
  });
  test("タスクを編集：入力値が反映される", async () => {
    const user = userEvent.setup();
    const editableTask = {...createMockTodoItemProps().task, isEdit: true,};
    await user.click(screen.getByLabelText('タスクのテキスト'));
    expect(createMockTodoItemProps().handlers.onShowEdit).toHaveBeenCalledWith(createMockTodoItemProps().task.id);
    rerender(<TodoItem {...createMockTodoItemProps()} task={editableTask} />); //型に応じたモックデータを渡す
    const inputElement = screen.getByLabelText('タスク編集');
    await user.clear(inputElement);
    await user.type(inputElement, 'updated');
    expect(createMockTodoItemProps().handlers.onChangeText).toHaveBeenCalledWith(createMockTodoItemProps().task.id, 'updated');
  });
  test("タスク編集中にEnter：入力確定", async () => {
    const user = userEvent.setup();
    const props = createMockTodoItemProps({isEdit: true});
    
    rerender(<TodoItem {...props} /> );
    const inputElement = screen.getByLabelText('タスク編集');
    await user.type(inputElement,'{Enter}');
    expect(props.handlers.onConfirmEdit).toHaveBeenCalledWith(
        expect.objectContaining({
          key: 'Enter',
          type: 'keyup',
        }),
        props.task.id
    );
  });
  test("ゴミ箱アイコンクリック：当該要素が消える", async () => {
    const user = userEvent.setup();
    const trashIcon = screen.getByLabelText('タスク削除');
    await user.click(trashIcon);
    expect(createMockTodoItemProps().handlers.onRemoveTask).toHaveBeenCalledWith(createMockTodoItemProps().task.id);
  });
});