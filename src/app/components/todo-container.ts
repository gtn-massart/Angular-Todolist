import { Component, signal } from '@angular/core';
import { TodoForm } from './todo-form';
import { TodosList } from './todos-list';
import { TodoInterface } from '../shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo-container',
  imports: [TodoForm, TodosList],
  template: `
    <app-todo-form (addTodo)="addTodo($event)" />
    <app-todos-list [todosList]="todosList()" />
  `,
  styles: `
    :host {
      padding: 32px;
    }
  `,
})
export class TodoContainer {
  todosList = signal<TodoInterface[]>([
    {
      id: '1',
      name: 'Ranger ma chambre',
      done: false,
    },
    {
      id: '2',
      name: 'Apprendre Angular',
      done: true,
    },
    {
      id: '3',
      name: 'Lire Crime et châtiment',
      done: false,
    },
  ]);

  addTodo(todo: TodoInterface) {
    this.todosList.update((todos) => [...todos, todo])
  }
}
