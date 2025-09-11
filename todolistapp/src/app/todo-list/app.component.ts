import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoInputComponent} from "./todo-list-input/todo-list-input.component";
import {TodoItemComponent} from "./todo-list-item/todo-list-item.component";
import {ToDoItem} from "../models/todo-item.model";
import {TodoService} from "../services/todo.service";

@Component({
    selector: 'app-component',
    standalone: true,
    imports: [CommonModule, TodoInputComponent, TodoItemComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    items: ToDoItem[] = [];

    constructor(private todoService: TodoService) {
        this.todoService.items$.subscribe(items => {
            this.items = items;
        });
    }

    onAddTodo(text: string): void {
        this.todoService.addTodo(text);
    }

    onToggleDone(itemId: number): void {
        this.todoService.toggleDone(itemId);
    }

    onRemoveItem(itemId: number): void {
        this.todoService.removeItem(itemId);
    }
}