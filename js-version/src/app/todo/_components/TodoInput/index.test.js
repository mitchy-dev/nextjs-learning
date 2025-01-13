import { render, screen } from "@testing-library/react";
import {TodoInput} from "@/app/todo/_components/TodoInput/index";
import {mockAddTask} from "@/tests/factories/todo";
import userEvent from "@testing-library/user-event";

describe("タスク作成コンポーネント", () => {
  test("初期表示", () => {
     render(<TodoInput onSubmit={mockAddTask} />);
     const textbox = screen.getByRole('textbox');
     expect(textbox).toBeInTheDocument();
     expect(screen.getByLabelText('タスクを作成')).toBeInTheDocument();
     expect(textbox).toHaveAttribute('placeholder', 'something todo task');
     expect(textbox).toHaveValue('');
     
  });
  test("keyupで関数呼び出し", async () => {
    render(<TodoInput onSubmit={mockAddTask} />);
    const user = userEvent.setup();
    const inputElement = screen.getByRole('textbox');
    await user.type(inputElement, 'type');
    expect(mockAddTask).toHaveBeenCalled();
  });
});