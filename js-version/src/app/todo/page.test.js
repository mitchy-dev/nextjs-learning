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
    expect(screen.getByText('タスクのテキスト')).toBeInTheDocument();
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