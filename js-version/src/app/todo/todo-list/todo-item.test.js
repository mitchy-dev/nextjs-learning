import { render, screen } from "@testing-library/react";
import {TodoItem} from "@/app/todo/todo-list/todo-item";

describe("タスクコンポーネント", () => {
  beforeEach(() => {
    render(<TodoItem />);
  });
  test("初期表示", () => {
    expect(screen.getByText('TodoItem')).toBeInTheDocument();
  });
});