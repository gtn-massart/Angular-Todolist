import { Component } from '@angular/core';
import { Todo } from "./todo";

@Component({
  selector: 'app-todos-list',
  imports: [Todo],
  template: `
    <ul class="flex flex-col gap-12">
      <app-todo />
      <app-todo />
      <app-todo />
      <app-todo />
    </ul>
  `,
  styles: `
    ul {
      margin-top: 16px;
    }
  `,
})
export class TodosList {}
