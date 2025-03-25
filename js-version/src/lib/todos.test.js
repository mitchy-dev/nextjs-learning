import {createdTodoResponse, createMockTask, createNewTodoRequest} from "@/tests/factories/todo";
import {API_URL, fetchTodos, creteTodo, updateTodo} from "@/lib/todos";
import {API_ERRORS} from "@/lib/errorMessage";

describe("Todos API Client", () => {
  // この記述でも実行できるが
  // global.fetch以降でjest.fn()のメソッドの入力補完が効かないため次の記述をする
  // global.fetch = jest.fn();
  const fetchMock = jest.fn();
  global.fetch = fetchMock;
  
  describe("fetchTodos", () => {
    test("正常にデータ取得できる", async() => {
      // レスポンスを決める。この定義に冗長さを感じたらMSW導入
     fetchMock.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([createMockTask()]),
      });
      const result = await fetchTodos();
      expect(fetch).toHaveBeenCalledWith(API_URL);
      expect(result).toEqual([createMockTask()]);
    });
    test("サーバーエラーの処理", async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
      });
      await expect(fetchTodos()).rejects.toThrow(API_ERRORS.SERVER_ERROR(500));
    });
    test("ネットワークエラーの処理", async () => {
      fetchMock.mockRejectedValue(new TypeError(API_ERRORS.NETWORK_ERROR));
      await expect(fetchTodos()).rejects.toThrow(API_ERRORS.NETWORK_ERROR);
    });
    test("その他の例外の処理", async () => {
      const originalError = new Error(API_ERRORS.UNKNOWN_ERROR);
      fetchMock.mockRejectedValue(originalError);
      await expect(fetchTodos()).rejects.toBe(originalError);
    });
  });
  
  describe("createTodo", () => {
    test("正常系", async () => {
      // リクエストデータ
      const newTodoRequest = createNewTodoRequest();
      // レスポンスデータ
      const todoResponse = createdTodoResponse(newTodoRequest);
      // fecthモックの処理
      fetchMock.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(todoResponse),
      });
      // 操作の実行
      const result = await creteTodo(newTodoRequest);
      // httpリクエストの検証
      expect(fetch).toHaveBeenCalledWith(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodoRequest),
      });
      // レスポンスの検証
      expect(result).toEqual(todoResponse);
    });
    test("サーバーエラー", async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
      });
      await expect(creteTodo()).rejects.toThrow(API_ERRORS.SERVER_ERROR(500));
    });
    test("ネットワークエラー", async () => {
      fetchMock.mockRejectedValue(new TypeError(API_ERRORS.NETWORK_ERROR));
      await expect(creteTodo()).rejects.toThrow(API_ERRORS.NETWORK_ERROR);
    });
    test("その他の例外をそのまま処理", async () => {
      const newTodoRequest = createNewTodoRequest();
      const originalError = new Error(API_ERRORS.UNKNOWN_ERROR);
      fetchMock.mockRejectedValue(originalError);
      await expect(creteTodo(newTodoRequest)).rejects.toBe(originalError);
    });
  });
  
  describe("updateTodo", () => {
    test("正常系：完了状態の更新", async () => {
    //   モックタスク：更新前
      const testCases = [
        { from: false, to: true,},
        { from: true, to: false,},
      ];
      for (const testCase of testCases) {
        const initialTodo = createMockTask({ isDone: testCase.from,});
        const updates =  { isDone: testCases.to };
        //   モックタスク：更新後
        const updatedTodo = {
          ...initialTodo,
          updates
        };
        fetchMock.mockReset();
        //   APIレスポンスのモック
        fetchMock.mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue(updatedTodo),
        });
        //   APIクライアントの実行
        const result = await updateTodo(initialTodo.id, updates);
        
        //   アサーション：APIコール
        expect(fetch).toHaveBeenCalledWith(`${API_URL}/${initialTodo.id}`,{
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        });
        //   アサーション：APIレスポンスと更新後のモックタスク
        expect(result).toEqual(updatedTodo);
      }
    });
    test("正常系：テキストの更新", async () => {
      const testCase = { from: 'before', to: 'after',};
      const initialTodo = createMockTask({ text: testCase.from,});
      const updates =  { text: testCase.to };
      const updatedTodo = {
        ...initialTodo,
        ...updates
      };
      //   APIレスポンスのモック
      fetchMock.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(updatedTodo),
      });
      //   APIクライアントの実行
      const result = await updateTodo(initialTodo.id, updates);
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/${initialTodo.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      //   アサーション：APIレスポンスと更新後のモックタスク
      expect(result).toEqual(updatedTodo);
    });
  });
});