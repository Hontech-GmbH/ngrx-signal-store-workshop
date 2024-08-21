import { signalStore, withHooks, withState } from '@ngrx/signals';
import { initialState, TodoState } from './todo.state';
import { withTodoMethods } from './todo.methods';
import { withTodoSelectors } from './todo.selectors';
import { withRequestStatus } from '../../../shared/state';

export const TodoStore = signalStore(
  withState<TodoState>(initialState),
  withRequestStatus(),
  withTodoSelectors(),
  withTodoMethods(),
  withHooks({
    onInit: (store) => store.loadAll(),
  }),
);
