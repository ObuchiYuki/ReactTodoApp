import { v4 as uuid } from "uuid"
import { BindingArray, BindingMap, Bindable } from "y-orm-typescript"

export class Todo {
    get id(): string { return this.map.getConstString("id") }
    set id(value) { this.map.setConst("id", value) }

    get title(): string { return this.map.getString("title") ?? "" }
    set title(value) { this.map.set("title", value) }

    get completed(): boolean { return this.map.getBoolean("completed") ?? false }
    set completed(value) { this.map.set("completed", value) }

    toggleCompleted() { this.completed = !this.completed }

    constructor(public map: BindingMap) {}
}
Bindable.mark(Todo, { id: "const" })

export class TodoStore {
    readonly todos: BindingArray<Todo>
    
    constructor(public map: BindingMap) {
        this.todos = map.takeBindableArray(Todo, "todos")
    }

    addTodo(title: string) {
        const id = uuid()
        const todo = Bindable.make(Todo, { id: id, title: title })
        this.todos.unshift([todo])
    }

    removeCompleted() {
        console.log("remove completed")
        this.todos.removeWhere(todo => todo.completed)
    }

    get remeiningTodos() { return this.todos.filter(todo => !todo.completed) }
    get completedTodos() { return this.todos.filter(todo => todo.completed) }
}