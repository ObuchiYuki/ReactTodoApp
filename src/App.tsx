import { autorun, reaction, toJS, when } from 'mobx';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { Header, AppContaner, AppCard, Footnote } from "./Components/Containers"
import { Input, Button } from "./Components/Controls"
import { TodoInputForm, TodoList } from "./Components/TodoComponents"

import { TodoStore } from "./Model/Todo"

export default function App() {
  
  const [todoTitle, setTodoTitle] = useState<string>("")
  const [store] = useState<TodoStore>(() => {
    return new TodoStore(localStorage.getItem("todos"))
  })

  const [checkCompleted] = useState<_.DebouncedFunc<() => void>>(() => _.debounce(() => { 
      store.removeCompleted() 
    }, 2000))

  useEffect(() => { 
    autorun(() => { localStorage.setItem("todos", store.toJSON) }, { delay: 30 }) 
  }, [store])

  useEffect(() => {
    checkCompleted()
    reaction(() => store.remeiningTodos.length, () => {
      checkCompleted()
    })
  }, [store, checkCompleted])

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

        <Footnote> {store.remeiningTodos.length} todos remaining.</Footnote>

      </AppCard>
    </AppContaner>
  );
}

