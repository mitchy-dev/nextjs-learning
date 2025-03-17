import {createdTodoResponse, createMockTask, createNewTodoRequest} from "@/tests/factories/todo";
import {API_URL, fetchTodos, creteTodo} from "@/lib/todos";
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

  });
});