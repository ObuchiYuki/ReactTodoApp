import { autorun, reaction } from 'mobx';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Header, AppContaner, AppCard, Footnote } from "./Components/Containers"
import { Input, Button } from "./Components/Controls"
import { TodoInputForm, TodoList, TodoFootnote } from "./Components/TodoComponents"
import { TodoStore } from "./Model/Todo"

export default function App() {
  
  const [todoTitle, setTodoTitle] = useState<string>("")
  const [store] = useState(() => new TodoStore(localStorage.getItem("todos")))

  useEffect(() => autorun(() => { 
    localStorage.setItem("todos", store.toJSON)
  }, { delay: 30 }) , [store])

  useEffect(() => {
    const checkCompleted = _.debounce(() => store.removeCompleted(), 2000)
    checkCompleted()
    reaction(() => store.remeiningTodos.length, () => checkCompleted())
  }, [store])

  const registerNewTodo = (e: React.MouseEvent) => {
    e.preventDefault()
    store.addTodo(todoTitle)
    setTodoTitle("")
  }

  return (
    <AppContaner>
      <AppCard>
        <Header />

        <TodoInputForm onSubmit={e => { e.preventDefault() }}>
          <Input placeholder='Add your new todos' type="text" value={todoTitle} onChange={ e => { setTodoTitle(e.target.value) } } />
          <Button onClick={registerNewTodo} disabled={todoTitle.length === 0}>+</Button>
        </TodoInputForm>
        
        <TodoList store={store}/>
        <TodoFootnote store={store}/>
      </AppCard>
    </AppContaner>
  );
}

