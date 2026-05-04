import { Component, input, output } from '@angular/core';
import { TodoInterface } from '../shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo',
  imports: [],
  template: `
    <li class="flex gap-12 border px-12">
      <p class="flex-auto">{{ todo().name }}</p>
      <input type="checkbox" [checked]="todo().done" />
    </li>
  `,
  host: {
    '(click)': 'toggleTodo.emit(todo()._id)',
  },
  styles: `
    li {
      cursor: pointer;
    }
  `,
})
export class Todo {
  todo = input.required<TodoInterface>();
  toggleTodo = output<string>();
}
