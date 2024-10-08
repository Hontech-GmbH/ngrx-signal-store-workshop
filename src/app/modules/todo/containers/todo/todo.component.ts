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
})
export class TodoComponent implements OnInit {
  // TODO: Implement Functionality with Signal Store

  ngOnInit(): void {}

  addTodo(value: string): void {}

  updateTodo(todo: Todo): void {}

  deleteTodo(id: string): void {}
}
