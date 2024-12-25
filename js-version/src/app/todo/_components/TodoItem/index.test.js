import { render, screen } from "@testing-library/react";
import {TodoItem} from "./index";
import userEvent from "@testing-library/user-event";
import {mockProps} from "@/tests/factories/todo";

describe("タスクコンポーネント", () => {
  let rerender;
  
  beforeEach(() => {
    const result = render(<TodoItem {...mockProps} />); //型に応じたモックデータを渡す
    rerender = result.rerender;
  });
  test("初期表示", () => {
    expect(screen.getByText(mockProps.task.text)).toBeInTheDocument(); //呼出チェック
  });
  test("未完了のタスクをクリック：完了状態になる", async () => {
    const checkIcon = screen.getByLabelText('タスクの完了状態');
    const user = userEvent.setup();
    await user.click(checkIcon);
    expect(mockProps.onToggleDone).toHaveBeenCalledWith(mockProps.task.id, mockProps.task.isDone); //呼出チェック、h1とは異なりユーザーイベントが事前に必要
  });
  test("タスクをクリック：編集モードになる", async () => {
   const displayElement = screen.getByLabelText('タスクのテキスト');
   const user = userEvent.setup();
   await user.click(displayElement);
   expect(mockProps.onShowEdit).toHaveBeenCalledWith(mockProps.task.id); //呼出チェック、h1とは異なりユーザーイベントが事前に必要
  });
  test("タスクを編集：入力値が反映される", async () => {
    const user = userEvent.setup();
    const editableTask = {...mockProps.task, isEdit: true,};
    await user.click(screen.getByLabelText('タスクのテキスト'));
    expect(mockProps.onShowEdit).toHaveBeenCalledWith(mockProps.task.id);
    rerender(<TodoItem {...mockProps} task={editableTask} />); //型に応じたモックデータを渡す
    const inputElement = screen.getByLabelText('タスク編集');
    await user.clear(inputElement);
    await user.type(inputElement, 'updated');
    expect(mockProps.onChangeText).toHaveBeenCalledWith(mockProps.task.id, 'updated');
  });
//   ゴミ箱アイコンクリック：当該要素が消える
  test("ゴミ箱アイコンクリック：当該要素が消える", async () => {
    const user = userEvent.setup();
    const trashIcon = screen.getByLabelText('タスク削除');
    await user.click(trashIcon);
    expect(mockProps.onDeleteTask).toHaveBeenCalledWith(mockProps.task.id);
  });
});