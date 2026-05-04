import { Component, computed, inject } from '@angular/core';
import { TodoForm } from './todo-form';
import { TodosList } from './todos-list';
import { TodoFormInterface } from '../shared/interfaces/todo.interface';
import { TodosService } from '../shared/services/todos-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todo-container',
  imports: [TodoForm, TodosList, JsonPipe],
  template: `
    <app-todo-form (addTodo)="addTodo($event)" />
    <app-todos-list
      (toggleTodo)="toggleTodo($event)"
      (selectTodo)="selectTodo($event)"
      [todosList]="todosList()"
    />
    <pre>{{ selectedTodo() | json }}</pre>
  `,
  styles: `
    :host {
      padding: 32px;
    }
  `,
})
export class TodoContainer {
  todosService = inject(TodosService);
  todosList = computed(() => this.todosService.todosResource.value() || []);
  selectedTodo = this.todosService.selectedTodoResource.value;

  addTodo(todo: TodoFormInterface) {
    this.todosService.addTodo(todo);
  }

  selectTodo(todoId: string) {
    this.todosService.selectTodo(todoId);
  }
  toggleTodo(todoId: string) {}
}
