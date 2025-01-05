
export const mockTask = {
  id: 1,
  text: 'todo1',
  isEdit: false,
  isDone: false,
}

export const createMockTask = (overrides = {}) => ({
  id: 1,
  text: 'todo1',
  isEdit: false,
  isDone: false,
  ...overrides
});
export const mockTodoHandlers = {
  onToggleDone: jest.fn(),
  onShowEdit: jest.fn(),
  onChangeText: jest.fn(),
  onRemoveTask: jest.fn(),
};
export const mockTodoItemProps = { //型に応じたモックデータ
  task: createMockTask(),
  handlers: mockTodoHandlers,
};

export const mockPropsList = [
  mockTodoItemProps.task
];
export const emptyTask = [];
export const multipleTasks = [
    createMockTask(),
    createMockTask({
      id: 2,
      text: 'todo2',
      isDone: true,
    }),
    createMockTask({
      id: 3,
      text: 'メモ',
      isEdit: false,
      isDone: false,
    }),
];
