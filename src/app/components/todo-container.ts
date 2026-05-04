import { Component, inject, signal } from '@angular/core';
import { TodoForm } from './todo-form';
import { TodosList } from './todos-list';
import { TodoFormInterface, TodoInterface } from '../shared/interfaces/todo.interface';
import { TodosService } from '../shared/services/todos-service';

@Component({
  selector: 'app-todo-container',
  imports: [TodoForm, TodosList],
  template: `
    <app-todo-form (addTodo)="addTodo($event)" />
    <app-todos-list (toggleTodo)="toggleTodo($event)" [todosList]="todosList()" />
  `,
  styles: `
    :host {
      padding: 32px;
    }
  `,
})
export class TodoContainer {
  todosList = signal<TodoInterface[]>([]);
  todosService = inject(TodosService);

  addTodo(todo: TodoFormInterface) {
    this.todosService.addTodo(todo);
  }

  toggleTodo(todoId: string) {
    this.todosList.update((todos) =>
      todos.map((todo) => {
        if (todoId === todo._id) {
          return {
            ...todo,
            done: !todo.done,
          };
        } else {
          return todo;
        }
      }),
    );
  }
}
