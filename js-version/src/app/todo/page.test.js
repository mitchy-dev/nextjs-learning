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
    const initialTasksCount = screen.getAllByLabelText('タスクのテキスト').length;
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
  test("タスクをクリック：編集モードになる", async () => {
  //   操作対象：span
  //   取得：aria-label
  //   操作：click
  //   期待値：input:textが出現
  //   期待値の取得:getByRole, 値はtodo1
    const taskText = 'todo1';
    const initialElement = screen.getByText(taskText);
    
    const user = userEvent.setup();
    await user.click(initialElement);
    
    expect(screen.getByLabelText('タスク編集')).toHaveValue(taskText);
  });
  // 入力値の反映:onChangeText
  test("タスクを編集：入力値が反映される", async () => {
    const initialElement = screen.getByText('todo1');
    const user = userEvent.setup();
    await user.click(initialElement);
    const targetElement = screen.getByLabelText('タスク編集');
    await user.clear(targetElement);
    await user.type(targetElement, 'updated');
    expect(targetElement).toHaveValue('updated'); //タイピングの反映
    await user.keyboard('{Shift>}{Enter}{/Shift}');
    expect(targetElement).not.toBeInTheDocument(); //要素の切り替わり
    const updatedElement = screen.getByText('updated');
    expect(updatedElement).toHaveProperty('tagName', 'SPAN');
    expect(updatedElement).toHaveTextContent('updated');
  });
  // タスク削除:handleRemoveTask
  test("要素のゴミ箱アイコンクリック：当該要素が削除される", async () => {
    expect(screen.getByText('todo1')).toBeInTheDocument();
    expect(screen.getByText('todo2')).toBeInTheDocument();
    
    const user = userEvent.setup();
    const deleteButton = screen.getByLabelText('タスク削除1');
    await user.click(deleteButton);
   
    expect(screen.queryByText('todo1')).not.toBeInTheDocument();
    expect(screen.getByText('todo2')).toBeInTheDocument();
  });
});