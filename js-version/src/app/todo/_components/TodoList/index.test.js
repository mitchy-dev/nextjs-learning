import { render, screen } from "@testing-library/react";
import {TodoList} from "./index";
import {multipleTasks, mockPropsList, emptyTask, defaultProps} from "@/tests/factories/todo";

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