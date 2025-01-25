import { render, screen } from "@testing-library/react";
import {TodoSearch} from "@/app/todo/_components/TodoSearch/index";
import userEvent from "@testing-library/user-event";

import {NextIntlClientProvider} from 'next-intl';
import messages from '@messages/ja.json'

describe("タスク検索コンポーネント", () => {
  const mockDefaultValue = "";
  const mockOnChange = jest.fn();
  test("初期表示", async () => {
     render(
         // todo プロバイダーの記述を共通化する
         <NextIntlClientProvider messages={messages} locale="ja">
          <TodoSearch defaultValue={mockDefaultValue} onChange={mockOnChange} />
         </NextIntlClientProvider>
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