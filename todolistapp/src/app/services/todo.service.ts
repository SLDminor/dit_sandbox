import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoItem } from '../models/todo-item.model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private itemsSubject = new BehaviorSubject<ToDoItem[]>([]);
    items$ = this.itemsSubject.asObservable();

    addTodo(name: string): void {
        if (!name || name.trim() === '') return;

        const currentItems = this.itemsSubject.value;
        const newItems = [...currentItems, new ToDoItem(name.trim())];
        this.itemsSubject.next(newItems);
    }

    removeItem(itemId: number): void {
        const newItems = this.itemsSubject.value.filter(item => item.id !== itemId);
        this.itemsSubject.next(newItems);
    }

    toggleDone(itemId: number): void {
        const newItems = this.itemsSubject.value.map(item =>
            item.id === itemId ? { ...item, done: !item.done } : item
        );
        this.itemsSubject.next(newItems);
    }
}