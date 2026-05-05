import { Component, input, output } from '@angular/core';
import { TodoInterface } from '../shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo',
  imports: [],
  template: `
    @let t = todo();
    <li class="flex gap-12 border px-12">
      <p (click)="selectTodo.emit(t._id)" class="flex-auto">{{ t.name }}</p>
      <input (click)="toggleTodo()" type="checkbox" [checked]="t.done" />
    </li>
  `,
  styles: ``,
})
export class Todo {
  todo = input.required<TodoInterface>();
  updateTodo = output<TodoInterface>();
  selectTodo = output<string>();
  toggleTodo() {
    this.updateTodo.emit({...this.todo(), done: !this.todo().done})
  }
}
