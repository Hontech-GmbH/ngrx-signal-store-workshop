import { Todo } from '../../models/todo.models';

export type TodoState = {
  todos: Todo[];
};

export const initialState: TodoState = {
  todos: [],
};
