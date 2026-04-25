import { Component, computed, signal, input, output } from '@angular/core';
import { Todo } from './todo';
import { TodoInterface } from '../shared/interfaces/todo.interface';
import { TodoFilter } from './todo-filter';

@Component({
  selector: 'app-todos-list',
  imports: [Todo, TodoFilter],
  template: `
    <hr />
    <app-todo-filter />
    <hr />
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
  filter = signal<string>('');
  todosList = input<TodoInterface[]>([]);
  filterdTodosList = computed(() =>
    this.todosList().filter((t) => t.name.toLowerCase().includes(this.filter())),
  );
  toggleTodo = output<string>();
}
