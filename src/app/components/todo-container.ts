import { Component, signal } from '@angular/core';
import { TodoForm } from './todo-form';
import { TodosList } from './todos-list';
import { TodoInterface } from '../shared/interfaces/todo.interface';

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

  addTodo(todo: TodoInterface) {
    this.todosList.update((todos) => [...todos, todo]);
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
