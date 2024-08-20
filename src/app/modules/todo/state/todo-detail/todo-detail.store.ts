import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { Todo } from '../../models/todo.models';
import { TodoService } from '../../services/todo.service';
import { initialState } from './todo-detail.state';

export const TodoDetailStore = signalStore(
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
      get: rxMethod<string>(
            switchMap((id) => todoService.get(id).pipe(
                tapResponse({
                    next: (todo) => patchState(store, { todo }),
                    error: () => console.error('Error Loading Todo')
                })
            ))
      ),

      update: rxMethod<Todo>(
          pipe(
              switchMap((todo) => todoService.update(todo).pipe(
                  tapResponse({
                      next: (todo) => patchState(store, { todo }),
                      error: () => console.error('Error Updating Todo')
                  })
              ))
          )
      ),
  }))
)
