import { render, screen } from "@testing-library/react";
import {TodoItem} from "./todo-item";
import userEvent from "@testing-library/user-event";

describe("タスクコンポーネント", () => {
  const mockProps = { //型に応じたモックデータ
    id: 1,
    text: 'todo1',
    isEdit: false,
    isDone: false,
    onToggleDone: jest.fn(),
    onShowEdit: jest.fn(),
  };
  beforeEach(() => {
    render(<TodoItem {...mockProps} />); //型に応じたモックデータを渡す
  });
  test("初期表示", () => {
    expect(screen.getByText(mockProps.text)).toBeInTheDocument(); //呼出チェック
  });
  test("未完了のタスクをクリック：完了状態になる", async () => {
    const checkIcon = screen.getByLabelText('タスクの完了状態');
    const user = userEvent.setup();
    await user.click(checkIcon);
    expect(mockProps.onToggleDone).toHaveBeenCalledWith(mockProps.id, mockProps.isDone); //呼出チェック、h1とは異なりユーザーイベントが事前に必要
  });
//   タスクをクリック：編集モードになる
  test("タスクをクリック：編集モードになる", async () => {
   const displayElement = screen.getByLabelText('タスクのテキスト');
   const user = userEvent.setup();
   await user.click(displayElement);
   expect(mockProps.onShowEdit).toHaveBeenCalledWith(mockProps.id, mockProps.isEdit); //呼出チェック、h1とは異なりユーザーイベントが事前に必要
  });
//   タスクを編集：入力値が反映される
//   ゴミ箱アイコンクリック：当該要素が消える
});