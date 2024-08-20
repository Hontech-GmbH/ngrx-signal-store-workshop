import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { TodoDetailFormComponent } from '../../presentationals/todo-detail-form/todo-detail-form.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Todo } from '../../models/todo.models';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [TodoDetailFormComponent, MatProgressSpinner],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent {
  // TODO: Implement Functionality With Signal Store

  readonly id = input.required<string>();

  save(todo: Todo): void {}
}
