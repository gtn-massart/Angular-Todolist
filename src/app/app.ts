import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [],
  template:`<h1>Todo</h1>`,
  styles:``
})
export class App {
  protected readonly title = signal('Angular-Todolist');
}
