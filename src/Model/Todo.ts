import { action, computed, makeObservable, observable } from "mobx"
import { v4 as uuid } from "uuid"
import { notNullable } from "../util/isArrayOf"

export class Todo {
    constructor(
        public readonly id: string,
        public title: string,
        public isCompleted: boolean = false
    ) {
        makeObservable(this, {
            title: observable,
            isCompleted: observable,
            toggleCompleted: action,
            renameTitle: action
        })
    }

    toggleCompleted() {
        this.isCompleted = !this.isCompleted
    }

    renameTitle(title: string) {
        this.title = title
    }

    static fromJson(json: any): Todo | null {
        const { id, title, isCompleted } = json
        if (typeof id === "string" && typeof title === "string" && typeof isCompleted === "boolean") {
            return new Todo(id, title, isCompleted)
        }
        return null
    }
}

export class TodoStore {
    @observable private _todos: Todo[] = []
    get todos() { return this._todos.slice() }

    constructor(json: string | null) {
        if (json != null) {
            const restoredTodos = JSON.parse(json)
            if (Array.isArray(restoredTodos)) {
                this._todos = restoredTodos.map(Todo.fromJson).filter(notNullable)
            }
        }

        makeObservable(this)
    }

    @action addTodo(title: string) {
        const id = uuid()
        const todo = new Todo(id, title)
        this._todos.splice(0, 0, todo)
    }

    @action removeTodo(todo: Todo) {
        this._todos.slice(this._todos.indexOf(todo), 1)
    }

    @action removeCompleted() {
        if (this.completedTodos.length > 0) {
            this._todos = this.remeiningTodos
        }
    }

    @computed get toJSON() {
        return JSON.stringify(this._todos)
    }

    @computed get remeiningTodos() {
        return this._todos.filter(e => !e.isCompleted)
    }
    @computed get completedTodos() {
        return this._todos.filter(e => e.isCompleted)
    }
}