import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";

class ToDoItem {
    constructor(
        public name: string,
        public done: boolean = false,
        public id: number = Date.now() + Math.random()
    ) {}
}

@Component({
    selector: "my-app",
    standalone: true,
    styleUrls: ['./app.component.css'],
    imports: [
        FormsModule
    ],
    template: `
        <div class="todolist-block">
            <h2>My ToDoList</h2>
            <div class="divider"></div>
            <div class="input-container">
                <input
                        class="todo-input"
                        placeholder="Что-то забыли?"
                        [(ngModel)]="text"
                >
                <button class="add-btn" (click)="addTodo(text)">+</button>
            </div>

            <div class="todo-list">
                @if (items.length !== 0) {
                    <ul>
                        @for (item of items; track $index) {
                            <li class="todo-item" [class.done]="item.done">
                                {{ item.name }}
                                <div class="todo-actions">
                                    <button (click)="toggleDone(item.id)" class="action-btn">{{item.done ? '↺' : '✓'}}</button>
                                    <button (click)="removeItem(item.id)" class="action-btn">×</button>
                                </div>
                            </li>
                        }

                    </ul>
                } @else {
                    <div class="empty-container" >Вы ничего не планировали</div>
                }
            </div>

        </div>
    `
})
export class AppComponent {
    text: string = '';

    items: ToDoItem[] = [];

    addTodo(name: string) {

        if(name == null || name.trim() == "")
            return;
        this.items.push(new ToDoItem(name));

        this.text = '';
    }

    removeItem(itemId: number) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    toggleDone(itemId: number) {
        const item = this.items.find(item => item.id === itemId);
        item && (item.done = !item.done);
    }
}