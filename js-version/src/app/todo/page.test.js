import {getByRole, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event"

import Page from "./page";



describe("タスク追加フォーム", () => {
  beforeEach(() => {
    render(<Page />);
  });
  test("初期表示", () => {
    const textbox = screen.getByRole('textbox', { name: 'タスクを作成',});
    expect(textbox).toHaveAttribute('placeholder','something todo task');
    expect(textbox).toHaveValue('');
  });
  test("タスク追加", async () => {
    const textbox = screen.getByRole('textbox', { name: 'タスクを作成',});
    const user = userEvent.setup();
    await user.type(textbox, 'タスクのテキスト');
    await user.keyboard('{Enter}');
    //spanタグのaria-labelなどで取得しないと入力値と区別つかない
    const spanElements = screen.getAllByLabelText('タスク名');
    expect(spanElements[spanElements.length - 1]).toHaveTextContent('タスクのテキスト');
  });
});
describe("タスク検索フォーム", () => {
  beforeEach(() => {
    render(<Page />);
  });
  test("初期表示", () => {
    const textbox = screen.getByRole('textbox', { name: 'タスクを検索',});
    expect(textbox).toHaveAttribute('placeholder', 'something keyword');
    expect(textbox).toHaveValue('');
  });
});