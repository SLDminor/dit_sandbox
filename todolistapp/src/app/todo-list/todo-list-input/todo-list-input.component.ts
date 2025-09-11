import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-todo-list-input',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './todo-list-input.component.html',
    styleUrls: ['./todo-list-input.component.css']
})
export class TodoInputComponent {
    text: string = '';

    @Output() addTodo = new EventEmitter<string>();

    onAddTodo(): void {
        if (this.text.trim()) {
            this.addTodo.emit(this.text);
            this.text = '';
        }
    }
}