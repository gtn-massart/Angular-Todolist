import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoInterface } from '../shared/interfaces/todo.interface';


@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  template: `
    <input type="text" [(ngModel)]="todoName" class="flex-auto border" placeholder="Entrez une todo" />
    <button class="btn btn-primary" (click)="addTodoInput()">Ajouter</button>
  `,
  styles: `
    :host {
      display: flex;
      gap: 12px;
    }
  `,
})
export class TodoForm {
  todoName: string = "";
  addTodo = output<TodoInterface>()

  addTodoInput() {
    if(this.todoName){
      const newTodo = {
        id: "" + Math.floor(Math.random() * 1001),
        name: this.todoName,
        done: false        
      };
      this.todoName = "";
      this.addTodo.emit(newTodo);
    }
  }
}
