"use client";

import classNames from 'classnames';
import {TodoItem} from "../todo/_components/TodoItem";
const mockProps = { //型に応じたモックデータ
  id: 1,
  text: 'todo1',
  isEdit: false,
  isDone: false,
  onToggleDone: () => {},
  onShowEdit: () => {},
  onChangeText: () => {},
  onDeleteTask: () => {},
};
const mockProps2 = { //型に応じたモックデータ
  id: 2,
  text: 'todo2',
  isEdit: true,
  isDone: true,
  onToggleDone: () => {},
  onShowEdit: () => {},
  onChangeText: () => {},
  onDeleteTask: () => {},
};
export default function Page() {
  return (
      <ul className='list'>
        <TodoItem {...mockProps} />
        <TodoItem {...mockProps2} />
      </ul>
  );
}