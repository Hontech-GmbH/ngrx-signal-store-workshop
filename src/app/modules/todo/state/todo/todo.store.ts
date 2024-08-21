import { signalStore, withHooks, withState } from '@ngrx/signals';
import { initialState } from './todo.state';
import { withTodoMethods } from './todo.methods';
import { withTodoSelectors } from './todo.selectors';

export const TodoStore = signalStore(
  withState(initialState),
  withTodoMethods(),
  withTodoSelectors(),
  withHooks({
    onInit: (store) => store.loadAll(),
  }),
);
