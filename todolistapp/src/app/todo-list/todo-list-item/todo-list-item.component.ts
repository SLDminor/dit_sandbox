import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDoItem } from '../../models/todo-item.model';

@Component({
    selector: 'app-todo-list-item',
    standalone: true,
    imports: [],
    templateUrl: './todo-list-item.component.html',
    styleUrls: ['./todo-list-item.component.css']
})
export class TodoItemComponent {
    @Input() item!: ToDoItem;
    @Output() toggleDone = new EventEmitter<number>();
    @Output() removeItem = new EventEmitter<number>();

    onToggleDone(): void {
        this.toggleDone.emit(this.item.id);
    }

    onRemoveItem(): void {
        this.removeItem.emit(this.item.id);
    }
}