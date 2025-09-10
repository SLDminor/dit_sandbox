import {ChangeDetectionStrategy, Component} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ToDoItem} from "./todo-item.model";
import {TodoService} from "./todo.service";

@Component({
    selector: "my-app",
    standalone: true,
    styleUrls: ['./app.component.css'],
    imports: [
        FormsModule
    ],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    text: string = '';

    get items(): ToDoItem[] {
        return this.todoService.items;
    }

    constructor(private todoService: TodoService) {}

    addTodo(name: string) {
        this.todoService.addTodo(name);
        this.text = '';
    }

    removeItem(itemId: number) {
        this.todoService.removeItem(itemId);
    }

    toggleDone(itemId: number) {
        this.todoService.toggleDone(itemId);
    }
}