import { screen } from "@testing-library/react";

import {render} from "@/test/test-utils";
import {TodoList} from "./index";
import {multipleTasks, mockPropsList, emptyTask, mockTodoHandlers} from "@/tests/factories/todo";
import PropTypes from "prop-types";
import {tasksListPropType} from "@/app/todo/_components/types/props";

describe("タスクリストコンポーネント", () => {
  test("モックデータの型チェック", () => {
    const mockProps = multipleTasks;
    expect(PropTypes.checkPropTypes(
{ tasks: tasksListPropType,},
   { tasks: mockProps,},
  'props'
    ));
  });
  test("空のリスト表示", () => {
    render(<TodoList tasks={emptyTask} handlers={mockTodoHandlers} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
  test("単一タスクの表示", () => {
    render(<TodoList tasks={mockPropsList} handlers={mockTodoHandlers} loading={false}  />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('todo1')).toBeInTheDocument();
  });
  test("複数タスク表示", () => {
    render(<TodoList
        tasks={multipleTasks}
        handlers={mockTodoHandlers}
        loading={false}
     />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    expect(screen.getByText('todo1', 'todo2', 'メモ')).toBeInTheDocument();
  });
});