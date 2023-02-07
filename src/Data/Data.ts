export class Todo {
    constructor(
        public id: string,
        public title: string,
        public isChecked: boolean = false
    ) {}
}