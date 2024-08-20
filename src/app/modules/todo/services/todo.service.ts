import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.models';
import { Observable, take } from 'rxjs';

const BASE_URL = 'https://sampletodobackend.azurewebsites.net/api/v1';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  private readonly todos = signal<Todo[]>([]);

  readonly count = computed(() => {
    return this.todos().length;
  });

  readonly doneCount = computed(
    () => this.todos().filter((item) => item.done).length,
  );

  readonly openCount = computed(
    () => this.todos().filter((item) => !item.done).length,
  );

  readonly sortedTodos = computed(() =>
    this.todos().sort((b, a) => +b.done - +a.done),
  );

  getAll(): Observable<Todo[]> {
    const url = `${BASE_URL}/todos`;

    return this.http.get<Todo[]>(url);
  }

  add(value: string): Observable<Todo> {
    const url = `${BASE_URL}/todos`;

    return this.http.post<Todo>(url, { value });
  }

  update(todo: Todo): Observable<Todo> {
    const url = `${BASE_URL}/todos/${todo.id}`;

    return this.http.put<Todo>(url, todo);
  }

  delete(id: string): Observable<void> {
    const url = `${BASE_URL}/todos/${id}`;

    return this.http.delete<void>(url);
  }

  get(id: string): Observable<Todo> {
    const url = `${BASE_URL}/todos/${id}`;

    return this.http.get<Todo>(url);
  }
}
