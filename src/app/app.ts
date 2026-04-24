import { Component, signal } from '@angular/core';
import { TodoContainer } from "./components/todo-container";


@Component({
  selector: 'app-root',
  imports: [TodoContainer],
  template:`
    <app-todo-container class="container"/>
  `,
  styles:``
})
export class App {
  protected readonly title = signal('Angular-Todolist');
}
