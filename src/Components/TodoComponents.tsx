import styled from 'styled-components'
import { CheckBox } from "./Controls"
import { Colors, } from "../Data/Const"
import { Todo } from "../Data/Data"
import { useState } from 'react'

export const TodoCardContainer = styled.li`
    border-bottom: 1px solid ${Colors.controlBorder};
    font-size: 12px;
    height: 36px;
    padding: 0.25em 1em;
    flex-grow: 100;
    display: flex;
    align-items: center;

    gap: 0 10px;
`

export const TodoCardTitleInput = styled.input.attrs({ type: "text" })`
    color: black;
`

export function TodoCard({ todo, onChange } : { todo: Todo, onChange?: () => void }) {
    const [title, setTitle] = useState<string>(todo.title)

    return (
        <TodoCardContainer key={todo.id}>
            <CheckBox value={todo.isChecked} onChange={ e => { todo.isChecked = !todo.isChecked; onChange && onChange() } }/>
            <TodoCardTitleInput value={title} onChange={ e => { setTitle(e.target.value); onChange && onChange() } }/>
        </TodoCardContainer>
    )
}

export const TodoList = styled.ul`
    display: flex;
    gap: 20px 0px;
    flex-direction: column;
`

export const TodoInputForm = styled.form`
    display: flex;
    width: 100%;
    padding: 0;
    gap: 0 20px;
`
