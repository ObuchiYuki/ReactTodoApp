import { v4 as uuid } from 'uuid';

import React, { useState } from 'react';

import { Header, AppContaner, AppCard } from "./Components/Containers"
import { Input, Button } from "./Components/Controls"
import { TodoCard, TodoList, TodoInputForm } from "./Components/TodoComponents"

import { Todo } from "./Data/Data"

export default function App() {
  
  const [todoTitle, setTodoTitle] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const todoChange = (todo: Todo) => {
    console.log("todoChange")
    if (todo.isChecked) {
      const removeIndex = todos.indexOf(todo)
      if (removeIndex === -1) return
      todos.splice(removeIndex, 1)
      setTodos(todos)
    }
  }

  const registerTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const id = uuid()
    const todo = new Todo(id, todoTitle, false)
    setTodos([todo].concat(todos))
  }

  return (
    <AppContaner>
      <AppCard>
        <Header />

        <TodoInputForm>
          <Input placeholder='Add your new todos' type="text" value={todoTitle} onChange={ e => { setTodoTitle(e.target.value) } } />
          <Button onClick={registerTodo}>Submit</Button>
        </TodoInputForm>

        <TodoList> 
          { todos.map(todo => <TodoCard todo={todo} onChange={ () => { todoChange(todo) } }/>) }
        </TodoList>

      </AppCard>
    </AppContaner>
  );
}

