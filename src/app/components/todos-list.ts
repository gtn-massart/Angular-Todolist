import { Component, effect, input, output } from '@angular/core';
import { Todo } from './todo';
import { TodoInterface } from '../shared/interfaces/todo.interface';

@Component({
  selector: 'app-todos-list',
  imports: [Todo],
  template: `
    <ul class="flex flex-col gap-12">
      @for (todo of todosList(); track todo.id) {
        <app-todo (toggleTodo)="toggleTodo.emit($event)" [todo]="todo" />
      } @empty {
        <li>Il n'y a aucune todo pour le moment</li>
      }
    </ul>
  `,
  styles: `
    ul {
      margin-top: 16px;
    }
  `,
})
export class TodosList {
  todosList = input<TodoInterface[]>([]);

  toggleTodo = output<string>()
}
