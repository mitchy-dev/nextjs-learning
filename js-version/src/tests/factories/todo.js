import PropTypes from "prop-types";

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
  onConfirmEdit: jest.fn(),
};
export const createMockTodoItemProps = (taskOverrides = {}) => ({ //型に応じたモックデータ
  task: createMockTask(taskOverrides),
  handlers: mockTodoHandlers,
});

export const mockPropsList = [
  createMockTodoItemProps().task
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
