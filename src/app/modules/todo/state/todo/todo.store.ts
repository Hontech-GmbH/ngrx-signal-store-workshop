import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { Todo } from '../../models/todo.models';
import { TodoService } from '../../services/todo.service';
import { initialState } from './todo.state';

export const TodoStore = signalStore(
    withState(initialState),
    withComputed(({ todos }) => ({
        count: computed(() => todos().length),
        doneCount: computed(() => todos().filter((todo) => todo.done).length),
        openCount: computed(() => todos().filter((todo) => !todo.done).length),
        sortedTodos: computed(() => todos().sort((b, a) => +b.done - +a.done)),
    })),
    withMethods((store, todoService = inject(TodoService)) => ({
        loadAll: rxMethod<void>(
            pipe(
                switchMap(() => todoService.getAll().pipe(
                    tapResponse({
                        next: (todos) => patchState(store, { todos }),
                        error: () => console.error('Error Loading Todos')
                    })
                ))
            )
        ),

        add: rxMethod<string>(
            pipe(
                switchMap((todoValue) => todoService.add(todoValue).pipe(tapResponse({
                    next: (todo) => patchState(store, { todos: [todo, ...store.todos()] }),
                    error: () => console.error('Error Adding New Todo')
                })))
            )
        ),

        update: rxMethod<Todo>(
            pipe(
                switchMap((todo) => todoService.update(todo).pipe(
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
                        error: () => console.error('Error Updating Todo')
                    })
                ))
            )
        ),

        delete: rxMethod<string>(
            pipe(
                switchMap((id) => todoService.delete(id).pipe(
                    tapResponse({
                        next: () => {
                            const todos = store
                                .todos()
                                .filter((todo) => todo.id !== id);

                            patchState(store, { todos });
                        },
                        error: () => console.error('Error Deleting Todo')
                    })
                ))
            )
        )
    }))
)
