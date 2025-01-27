import { screen } from "@testing-library/react";

import messages from '@messages/ja.json'
import { render } from "@/test/test-utils"
import {TodoSearch} from "@/app/todo/_components/TodoSearch/index";
import userEvent from "@testing-library/user-event";
describe("タスク検索コンポーネント", () => {
  const mockDefaultValue = "";
  const mockOnChange = jest.fn();
  test("初期表示", async () => {
     render(
      <TodoSearch defaultValue={mockDefaultValue} onChange={mockOnChange} />
     );
     const textbox = screen.getByRole('searchbox');
     expect(screen.getByLabelText(messages.TodoSearch.label)).toBeInTheDocument();
     expect(textbox).toHaveAttribute('placeholder', messages.TodoSearch.placeholder);
     expect(textbox).toHaveValue('');
  });
  test("onChangeで関数呼び出し", async () => {
    render(<TodoSearch defaultValue={mockDefaultValue} onChange={mockOnChange} />);
    const user = userEvent.setup();
    const textbox = screen.getByRole('searchbox');
    await user.type(textbox, 'type');
    expect(mockOnChange).toHaveBeenCalled();
    
  });
});