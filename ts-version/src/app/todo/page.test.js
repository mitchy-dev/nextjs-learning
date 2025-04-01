import {getByRole, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event"

import messages from "@messages/ja.json";

import {render} from "@/test/test-utils";
import Page from "./page";
import {mockTodoHandlers, multipleTasks} from "@/tests/factories/todo";

describe("タスク追加フォーム", () => {
  beforeEach(() => {
    render(<Page tasks={multipleTasks} handlers={mockTodoHandlers} />);
  });
  test("タスク追加", async () => {
    const textbox = screen.getByRole('textbox', { name: messages.TodoInput.label});
    const initialTasksCount = screen.getAllByLabelText(messages.TodoItem.textLabel).length;
    const user = userEvent.setup();
    await user.type(textbox, 'タスク追加');
    await user.keyboard('{Enter}');
    expect(screen.getAllByLabelText('タスクのテキスト')).toHaveLength(initialTasksCount + 1);
    expect(screen.getByText('タスク追加')).toBeInTheDocument();
  });
});
describe("タスク検索フォーム", () => {
  beforeEach(() => {
    render(<Page />);
  });
  test("前方一致", async () => {
    const searchbox = screen.getByRole('searchbox', {name: 'タスクを検索'});
    const user = userEvent.setup();
    const expectedTexts = ['todo1', 'todo2'];
    
    await user.type(searchbox, 'todo');
    
    const listItems = screen.getAllByRole('listitem');
    expectedTexts.forEach((text, index) => {
      expect(listItems[index]).toHaveTextContent(text);
    });
  });
    // 大文字小文字の区別
    test("大文字、小文字の検索：結果が同一", async () => {
      const expectedTasks =['todo1', 'todo2'];
      const searchVariations = ['TODO', 'Todo', 'todo'];
      const searchbox = screen.getByRole('searchbox', { name: 'タスクを検索',});
      for (const searchText of searchVariations) {
        await userEvent.clear(searchbox);
        await userEvent.type(searchbox, searchText);
        
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
    const searchbox = screen.getByRole('searchbox', { name: 'タスクを検索'});
    await userEvent.clear(searchbox);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(expectedTasks.length);
    expectedTasks.forEach((expectedTask, key) => {
      expect(listItems[key]).toHaveTextContent(expectedTask);
    })
  });
  test("todo1と入力するとtodo1のみ表示される", async () => {
    const searchbox = screen.getByRole('searchbox', { name: 'タスクを検索',});
    const user = userEvent.setup();
    await user.clear(searchbox);
    await user.type(searchbox, 'todo1');
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('todo1')).toBeInTheDocument();
    expect(screen.queryByText('todo2')).not.toBeInTheDocument();
  });
});