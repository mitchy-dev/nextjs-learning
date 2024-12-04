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

describe("タスクコンポーネント", () => {
  beforeEach(() => {
    render(<Page />);
  });
  test("初期表示", () => {
    const expectTasks = ['todo1', 'todo2'];
    const listItems = screen.getAllByRole('listitem');
    
    expect(listItems).toHaveLength(expectTasks.length);
    expectTasks.forEach((expectTask, key) => {
      expect(listItems[key]).toHaveTextContent(expectTask);
    })
  });
  // タスク完了の切り替え:handleToggleDone
  // ターゲット li直下のiタグ iタグの取得方法 getBy
  // 状態 fa-square-o→fa-check-square
  // 状態変化処理 handleToggleDoneでタスクのisDone: boolプロパティを反転
  // あまり内部の動作に拘らず、ユーザーの操作の模倣と期待値を先に定義する方が先
  // 期待値：アイコンの切り替え
  // ユーザー操作：アイコンクリック
  // 課題：liで囲んだ要素の取得方法
  // 答えとしてはgetByRoleで取得できなければgetByLabelText
  test("未完了のタスクをクリック：完了状態になる", async () => {
    const initialIcon = screen.getAllByLabelText('タスクの完了状態')[0];
    expect(initialIcon).toHaveClass('fa-square-o');
    
    const initialListItem = screen.getAllByRole('listitem')[0];
    expect(initialListItem).not.toHaveClass('list__item--done');
    
    const user = userEvent.setup();
    await user.click(initialIcon);
    
    expect(screen.getAllByLabelText('タスクの完了状態')[0]).toHaveClass('fa-check-square');
    expect(screen.getAllByRole('listitem')[0]).toHaveClass('list__item--done');
  });
  // 編集モードへの移行:handleShowEdit
  // 入力値の反映:onChangeText
  // 入力確定:confirmEdit
  // タスク削除:handleRemoveTask
});