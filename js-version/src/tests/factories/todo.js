
export const mockTask = {
  id: 1,
  text: 'todo1',
  isEdit: false,
  isDone: false,
}
export const mockTaskActions = {
  onToggleDone: jest.fn(),
  onShowEdit: jest.fn(),
  onChangeText: jest.fn(),
  onDeleteTask: jest.fn(),
};
export const mockProps = { //型に応じたモックデータ
  task: mockTask,
  ...mockTaskActions
};

export const mockPropsList = [
  mockProps.task
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
