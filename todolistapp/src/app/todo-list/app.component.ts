import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoInputComponent} from "todo-lib";
import {TodoItemComponent} from "todo-lib";
import {ToDoItem} from "todo-lib";
import {TodoService} from "todo-lib";

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