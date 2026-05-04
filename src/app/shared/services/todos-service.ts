import { Injectable, resource, signal } from '@angular/core';
import { TodoFormInterface, TodoInterface } from '../interfaces/todo.interface';
import { Todo } from '../../components/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  BASE_URL = 'https://restapi.fr/api/atodos';

  todosResource = resource({
    loader: async (): Promise<TodoInterface[]> => (await fetch(this.BASE_URL)).json(),
  });

  selectedTodoId = signal<string | null>(null);

  selectedTodoResource = resource({
    params: this.selectedTodoId,
    loader: async ({ params }): Promise<Todo | undefined> => {
      if (params) {
        return (await fetch(`${this.BASE_URL}/${params}`)).json();      
      } else {
        return;
      }
    } 
  });

  constructor() {}

  selectTodo(todoId: string) {
    this.selectedTodoId.set(todoId);
    console.log(this.selectedTodoId());
  }

  async addTodo(todo: TodoFormInterface) {
    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const body = await response.json();
      if (response.ok) {
        console.log({ body });
      } else {
        throw new Error('Oops');
      }
    } catch (e) {
      throw new Error('Oops');
    }
  }
}
