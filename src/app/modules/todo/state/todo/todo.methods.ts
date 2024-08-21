import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { TodoState } from './todo.state';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Todo } from '../../models/todo.models';
import { inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {
  RequestStatusState,
  setRequestStatusFulfilled,
  setRequestStatusLoading,
} from '../../../shared/state';

export function withTodoMethods() {
  return signalStoreFeature(
    { state: type<TodoState & RequestStatusState>() },

    withMethods((store, todoService = inject(TodoService)) => ({
      loadAll: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setRequestStatusLoading())),
          switchMap(() =>
            todoService.getAll().pipe(
              tapResponse({
                next: (todos) => {
                  patchState(store, { todos, ...setRequestStatusFulfilled() });
                },
                error: () => console.error('Error Loading Todos'),
              }),
            ),
          ),
        ),
      ),

      add: rxMethod<string>(
        pipe(
          switchMap((todoValue) =>
            todoService.add(todoValue).pipe(
              tapResponse({
                next: (todo) =>
                  patchState(store, { todos: [todo, ...store.todos()] }),
                error: () => console.error('Error Adding New Todo'),
              }),
            ),
          ),
        ),
      ),

      update: rxMethod<Todo>(
        pipe(
          switchMap((todo) =>
            todoService.update(todo).pipe(
              tapResponse({
                next: (todo) => {
                  if (todo.done) {
                    const allOtherTodos = store
                      .todos()
                      .filter((t) => t.id !== todo.id);
                    const todos = [...allOtherTodos, todo];

                    patchState(store, { todos });
                  } else {
                    const todos = store
                      .todos()
                      .map((t) => (t.id === todo.id ? todo : t));

                    patchState(store, { todos });
                  }
                },
                error: () => console.error('Error Updating Todo'),
              }),
            ),
          ),
        ),
      ),

      delete: rxMethod<string>(
        pipe(
          switchMap((id) =>
            todoService.delete(id).pipe(
              tapResponse({
                next: () => {
                  const todos = store.todos().filter((todo) => todo.id !== id);

                  patchState(store, { todos });
                },
                error: () => console.error('Error Deleting Todo'),
              }),
            ),
          ),
        ),
      ),
    })),
  );
}
