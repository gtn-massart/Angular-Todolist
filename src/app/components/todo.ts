import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  imports: [],
  template: `
    <li class="flex gap-12 border px-12">
        <p class="flex-auto">ma todo</p>
        <input type="checkbox" />
    </li>
  `,
  styles: ``,
})
export class Todo {}
