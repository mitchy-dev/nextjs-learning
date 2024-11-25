import { render, screen } from "@testing-library/react";
import Page from "./page";



describe("ToDoアプリのテスト", () => {
  test("初期表示", () => {
    render(<Page />);
    // screen.debug();
    expect(screen.getByRole('textbox', { name: 'タスクを作成'})).toHaveAttribute('placeholder','something todo task');
  });
});