import { Injectable } from '@angular/core';
import { ToDoItem } from '../models/todo-item.model';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly STORAGE_KEY = 'todo_items';

    async getItems(): Promise<ToDoItem[]> {
        return new Promise((resolve) => {
            try {
                const data = localStorage.getItem(this.STORAGE_KEY);
                if (!data) {
                    resolve([]);
                    return;
                }

                const items = JSON.parse(data);

                const result = items.map((item: any) => ({
                    ...item,
                    createdAt: new Date(item.createdAt)
                }));

                resolve(result);
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                resolve([]);
            }
        });
    }

    async saveItems(items: ToDoItem[]): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
                resolve();
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                reject(error);
            }
        });
    }
}