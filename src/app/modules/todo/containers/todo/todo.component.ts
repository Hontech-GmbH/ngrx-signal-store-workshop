import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TodoHeaderComponent } from '../../presentationals/todo-header/todo-header.component';
import { TodoFormComponent } from '../../presentationals/todo-form/todo-form.component';
import { TodoService } from '../../services/todo.service';
import { TodoListComponent } from '../../presentationals/todo-list/todo-list.component';
import { Todo } from '../../models/todo.models';
import { TodoStore } from '../../state/todo/todo.store';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    TodoHeaderComponent,
    TodoFormComponent,
    TodoListComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  providers: [TodoStore]
})
export class TodoComponent {
  private readonly todoStore = inject(TodoStore)

  readonly count = this.todoStore.count;

  readonly openCount = this.todoStore.openCount;

  readonly doneCount = this.todoStore.doneCount;

  readonly sortedTodos = this.todoStore.sortedTodos;

  addTodo(value: string): void {
    this.todoStore.add(value);
  }

  updateTodo(todo: Todo): void {
    this.todoStore.update(todo)
  }

  deleteTodo(id: string): void {
    this.todoStore.delete(id)
  }
}
