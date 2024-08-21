import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { Todo } from '../../models/todo.models';
import { TodoService } from '../../services/todo.service';
import { initialState } from './todo.state';
import { withTodoMethods } from "./todo.methods";
import { withTodoSelectors } from "./todo.selectors";

export const TodoStore = signalStore(
    withState(initialState),
    withTodoMethods(),
    withTodoSelectors(),
    withHooks({
      onInit: (store) => store.loadAll()
    })
)
