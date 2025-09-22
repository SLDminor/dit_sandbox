export class ToDoItem {
    constructor(
        public name: string,
        public done: boolean = false,
        public id: number = Date.now() + Math.random(),
        public createdAt: Date = new Date()
    ) {
    }
}