import { effect, Injectable, resource, signal } from '@angular/core';
import { TodoFormInterface, TodoInterface } from '../interfaces/todo.interface';
import { Todo } from '../../components/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  BASE_URL = 'https://restapi.fr/api/atodos';
  selectedTodoId = signal<string | null>(null);

  todosResource = resource({
    loader: async (): Promise<TodoInterface[]> => {
      // ↓ ?delay=3 simule un chargement plus long, ici 3 secondes
      const response = await fetch(`${this.BASE_URL}?delay=3`);
      if (!response.ok) {
        throw new Error('Erreur lors du chaergement des tâches.');
      } else {
        return response.json();
      }
    },
  });

  reloadTodos() {
    this.todosResource.reload();
  }

  selectedTodoResource = resource({
    params: () => ({ id: this.selectedTodoId() }),
    loader: async ({ params: { id }, abortSignal, previous }): Promise<Todo | undefined> => {
      if (id) {
        return (await fetch(`${this.BASE_URL}/${id}`, { signal: abortSignal })).json();
      } else {
        return;
      }
    },
  });

  constructor() {
    effect(() => {
      console.log({
        value: this.todosResource.value(),
        isLoading: this.todosResource.isLoading(),
        error: this.todosResource.error(),
        status: this.todosResource.status(),
      });
    });
  }

  selectTodo(todoId: string) {
    this.selectedTodoId.set(todoId);
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
