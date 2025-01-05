
export const mockTask = {
  id: 1,
  text: 'todo1',
  isEdit: false,
  isDone: false,
}
export const mockTodoHandlers = {
  onToggleDone: jest.fn(),
  onShowEdit: jest.fn(),
  onChangeText: jest.fn(),
  onRemoveTask: jest.fn(),
};
export const mockTodoItemProps = { //型に応じたモックデータ
  task: mockTask,
  handlers: mockTodoHandlers,
};

export const mockPropsList = [
  mockTodoItemProps.task
];
export const emptyTask = [];
export const multipleTasks = [
  {
    id: 1,
    text: 'todo1',
    isEdit: false,
    isDone: false,
  },
  {
    id: 2,
    text: 'todo2',
    isEdit: false,
    isDone: true,
  },
  {
    id: 3,
    text: 'メモ',
    isEdit: false,
    isDone: false,
  },
];
