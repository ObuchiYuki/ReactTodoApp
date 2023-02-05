import React, { useState } from 'react';
import Header from "./Components/Header"
import { Button } from "./Components/Button"
import { Input } from "./Components/Input"
import { Size, Shadow } from "./Const/Const"

import styled from 'styled-components'

const TodoInputForm = styled.form`
display: flex;
width: 100%;
padding: 0;
gap: 0 20px;
`

const AppContaner = styled.div`
margin: 12px;
display: flex;
justify-content: center;
`

const AppCard = styled.div`
padding: 12px;
padding-top: 0;
max-width: 480px;
background: white;
border-radius: ${Size.corner};
box-shadow: ${Shadow.card};
`

export default function App() {
  
  const [input, setInput] = useState<string>("")
  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }
  const registerTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setTodos(todos.concat([input]))
  }

  const [todos, setTodos] = useState<string[]>([])

  return (
    <AppContaner>
      <AppCard>
        <Header />

        <TodoInputForm>
          <Input placeholder='Add your new todos' type="text" value={input} onChange={updateInput} />
          <Button onClick={registerTodo}>Submit</Button>
        </TodoInputForm>

        <ul> 
          { todos.map(todo => <li>{todo}</li>) }
        </ul>

      </AppCard>
    </AppContaner>
  );
}

