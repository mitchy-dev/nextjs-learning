import { render, screen } from "@testing-library/react";
import {TodoList} from "./index";
import {mockProps} from "../TodoItem/index.test";

const mockPropsList = [
    mockProps.task
];
const emptyTask = [];
const multipleTasks = [
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
const defaultProps = {
  onToggleDone: jest.fn(),
  onShowEdit: jest.fn(),
  onChangeText: jest.fn(),
  onDeleteTask: jest.fn(),
};
describe("タスクリストコンポーネント", () => {
  test("空のリスト表示", () => {
    render(<TodoList tasks={emptyTask} {...defaultProps} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
  test("単一タスクの表示", () => {
    render(<TodoList tasks={mockPropsList} {...defaultProps} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('todo1')).toBeInTheDocument();
  });
  test("複数タスク表示", () => {
    render(<TodoList
        tasks={multipleTasks}
        {...defaultProps}
     />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    expect(screen.getByText('todo1', 'todo2', 'メモ')).toBeInTheDocument();
  });
});