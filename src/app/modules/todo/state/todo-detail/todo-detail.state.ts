import { Todo } from '../../models/todo.models';

export type TodoDetailState = {
  todo: Todo | null;
};

export const initialState: TodoDetailState = {
  todo: null,
};
