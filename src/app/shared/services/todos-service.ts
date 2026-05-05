import { effect, Injectable, resource, signal } from '@angular/core';
import {TodoInterface, TodoFormInterface } from '../interfaces/todo.interface';
import { Todo } from '../../components/todo';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  BASE_URL = 'https://restapi.fr/api/atodos';
  selectedTodoId = signal<string | null>(null);

  todosResource = resource({
    loader: async (): Promise<TodoInterface[]> => {
      // ↓ ?delay=3 simule un chargement plus long, ici 3 secondes
      const response = await fetch(`${this.BASE_URL}?delay=1`);
      if (!response.ok) {
        throw new Error('Erreur lors du chaergement des tâches.');
      } else {
        return response.json();
      }
    },
  });

  // ↑↓ reviens à écrire ce qu'il y a ci-dessus mais en utilisant httpResource
  // todosResource = httpResource<Todo[]>(() => ({
  //   url: this.BASE_URL,
  //   method: 'GET',
  //   // body: '',
  //   params: {
  //     delay: 1
  //   }
  // }), {
  //   defaultValue: [],
  // })

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

  // ↑↓ reviens à écrire ce qu'il y a ci-dessus mais en utilisant httpResource
  // selectedTodoResource = httpResource<Todo | undefined>(
  //   () => {
  //     const todoId = this.selectedTodoId()
  //     if(!todoId) return undefined;
  //     return `${this.BASE_URL}/${todoId}`
  //   }
  // )

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
        this.todosResource.update((todos) =>
          todos ? [...todos, body] : [body]
      );
      } else {
        throw new Error('Oops');
      }
    } catch (e) {
      throw new Error('Oops');
    }
  }

  async updateTodo(todo: TodoInterface) {
    try {
      const {_id, ...restTodo} = todo;
      const response = await fetch(`${this.BASE_URL}/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify(restTodo),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const body = await response.json();
      if (response.ok) {
        console.log({ body });
        this.todosResource.update((todos) =>
          todos?.map((t) => (t._id === (body as TodoInterface)._id ? body : t)),
        );
        this.selectedTodoResource.reload()
      } else {
        throw new Error('Oops');
      }
    } catch (e) {
      throw new Error('Oops');
    }
  }
}
