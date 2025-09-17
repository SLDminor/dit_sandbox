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
    isLoading: boolean = true;

    constructor(private todoService: TodoService) {
        this.todoService.items$.subscribe(items => {
            this.items = items;
        });

        this.todoService.isLoading$.subscribe(loading => {
            this.isLoading = loading;
        });
    }

    async onAddTodo(text: string): Promise<void> {
        await this.todoService.addTodo(text);
    }

    async onToggleDone(itemId: number): Promise<void> {
        await this.todoService.toggleDone(itemId);
    }

    async onRemoveItem(itemId: number): Promise<void> {
        await this.todoService.removeItem(itemId);
    }

}