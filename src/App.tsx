import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { autorun, reaction } from 'mobx';

import { WebSocketProvider } from "y-websocket-provider-typescript/dist/WebSocketProvider"
import { Bindable } from "y-orm-typescript"

import { Header, AppContaner, AppCard, Footnote } from "./Components/Containers"
import { Input, Button } from "./Components/Controls"
import { TodoInputForm, TodoList, TodoFootnote } from "./Components/TodoComponents"
import { TodoStore } from "./Model/Todo"

import * as Y from "yjs"

export default function App() {
  
  const [store, setStore] = useState<TodoStore|undefined>(undefined)
  const [todoTitle, setTodoTitle] = useState<string>("")

  useEffect(() => {
    const ydoc = new Y.Doc()
    const provider = new WebSocketProvider({
      serverUrl: "ws://y-websocket-server.eastasia.azurecontainer.io", roomname: "sample.document", doc: ydoc
    })

    provider.on("synced", () => {
      const store = Bindable.getRoot(ydoc).takeBindable(TodoStore, "store")
      setStore(store)
    })
  }, [])

  useEffect(() => { 
    if (store == null) return
    const checkCompleted = _.debounce(() => store.removeCompleted(), 2000)

    autorun(() => {
      if (store.completedTodos.length > 0) {
        checkCompleted()
      }
    })
  }, [store])

  const registerNewTodo = (e: React.MouseEvent) => {
    e.preventDefault()
    store?.addTodo(todoTitle)
    setTodoTitle("")
  }

  return (
    <AppContaner>
      <AppCard>
        <Header />

        {
          store ? 
          (
            <TodoInputForm onSubmit={e => { e.preventDefault() }}>
              <Input placeholder='Add your new todos' type="text" value={todoTitle} onChange={ e => { setTodoTitle(e.target.value) } } />
              <Button onClick={registerNewTodo} disabled={todoTitle.length === 0}>+</Button>
            </TodoInputForm>
          ) : (
            "Waiting to connect..."
          )
        }
        
        { store && <TodoList store={store}/> }
      </AppCard>
    </AppContaner>
  );
}

