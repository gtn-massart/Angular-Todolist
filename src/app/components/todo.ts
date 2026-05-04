import { Component, input, output } from '@angular/core';
import { TodoInterface } from '../shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo',
  imports: [],
  template: `
    <li class="flex gap-12 border px-12">
      <p (click)="selectTodo.emit(todo()._id)" class="flex-auto">{{ todo().name }}</p>
      <input (click)="toggleTodo.emit(todo()._id)" type="checkbox" [checked]="todo().done" />
    </li>
  `,
  styles: ``,
})
export class Todo {
  todo = input.required<TodoInterface>();
  toggleTodo = output<string>();
  selectTodo = output<string>();
}
