import { Component, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { TodoDetailFormComponent } from '../../presentationals/todo-detail-form/todo-detail-form.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Todo } from '../../models/todo.models';
import { TodoDetailStore } from '../../state/todo-detail/todo-detail.store';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [TodoDetailFormComponent, MatProgressSpinner],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
  providers: [TodoDetailStore]
})
export class TodoDetailComponent {
  private readonly todoDetailStore = inject(TodoDetailStore);

  readonly id = input.required<string>();

  readonly todo = this.todoDetailStore.todo;

  private readonly _loadCurrentTodo = effect(() => this.todoDetailStore.get(this.id()))

  save(todo: Todo): void {
    this.todoDetailStore.update(todo)
  }
}
