import { Injectable } from '@angular/core';
import { ToDoItem } from './todo-item.model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    items: ToDoItem[] = [];

    addTodo(name: string): void {
        if (!name || name.trim() === '') return;

        this.items.push(new ToDoItem(name.trim()));
        this.items = [...this.items];
    }

    removeItem(itemId: number): void {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    toggleDone(itemId: number): void {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.done = !item.done;
            this.items = [...this.items];
        }
    }
}