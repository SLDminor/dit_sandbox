import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoItem } from '../models/todo-item.model';
import {StorageService} from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private itemsSubject = new BehaviorSubject<ToDoItem[]>([]);
    items$ = this.itemsSubject.asObservable();

    isLoading$ = new BehaviorSubject<boolean>(true);

    constructor(private storageService: StorageService) {
        this.loadInitialData();
    }

    private async loadInitialData(): Promise<void> {
        this.isLoading$.next(true);

        try {
            const items = await this.storageService.getItems();
            this.itemsSubject.next(items);
        } catch (error) {
            console.error('Failed to load initial data:', error);
        } finally {
            this.isLoading$.next(false);
        }
    }

    private async saveToStorage(items: ToDoItem[]): Promise<void> {
        try {
            await this.storageService.saveItems(items);
        } catch (error) {
            console.error('Failed to save data:', error);
            throw error;
        }
    }

    async addTodo(name: string): Promise<void> {
        if (!name || name.trim() === '') return;

        const currentItems = this.itemsSubject.value;
        const newItems = [...currentItems, new ToDoItem(name.trim())];

        this.itemsSubject.next(newItems);
        await this.saveToStorage(newItems);
    }

    async removeItem(itemId: number): Promise<void> {
        const newItems = this.itemsSubject.value.filter(item => item.id !== itemId);
        this.itemsSubject.next(newItems);
        await this.saveToStorage(newItems);
    }

    async toggleDone(itemId: number): Promise<void> {
        const newItems = this.itemsSubject.value.map(item =>
            item.id === itemId ? { ...item, done: !item.done } : item
        );
        this.itemsSubject.next(newItems);
        await this.saveToStorage(newItems);
    }
}