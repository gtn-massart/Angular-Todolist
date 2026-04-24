import { Component } from '@angular/core';
import { TodoForm } from './todo-form';
import { TodosList } from './todos-list';

@Component({
  selector: 'app-todo-container',
  imports: [TodoForm, TodosList],
  template: `
    <app-todo-form />
    <app-todos-list />
  `,
  styles: ``,
})
export class TodoContainer {}
