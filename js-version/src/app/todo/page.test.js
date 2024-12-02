import {getByRole, render, screen, waitFor} from "@testing-library/react";
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
  // 前方一致
  test("前方一致", async () => {
    const textbox = screen.getByRole('textbox', {name: 'タスクを検索'});
    const user = userEvent.setup();
    const expectedTexts = ['todo1', 'todo2'];
    
    await user.type(textbox, 'todo');
    
    const listItems = screen.getAllByRole('listitem');
    expectedTexts.forEach((text, index) => {
      expect(listItems[index]).toHaveTextContent(text);
    });
  });
    // 大文字小文字の区別
    test("大文字、小文字の検索：結果が同一", async () => {
      const expectedTasks =['todo1', 'todo2'];
      const searchVariations = ['TODO', 'Todo', 'todo'];
      const textbox = screen.getByRole('textbox', { name: 'タスクを検索',});
      for (const searchText of searchVariations) {
        await userEvent.clear(textbox);
        await userEvent.type(textbox, searchText);
        
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(expectedTasks.length);
        expectedTasks.forEach((expectedTask, index) => { 
          expect(listItems[index]).toHaveTextContent(expectedTask);
        })
      }
    });
    // 空文字検索
  test("空文字検索：全件表示", async () => {
    const expectedTasks =['todo1', 'todo2'];
    const textbox = screen.getByRole('textbox', { name: 'タスクを検索'});
    await userEvent.clear(textbox);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(expectedTasks.length);
    expectedTasks.forEach((expectedTask, key) => {
      expect(listItems[key]).toHaveTextContent(expectedTask);
    })
  });
  
    
});