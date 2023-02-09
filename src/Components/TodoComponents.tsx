import styled from 'styled-components'
import { CheckBox } from "./Controls"
import { Colors, } from "../Const"
import { Todo, TodoStore } from "../Model/Todo"
import { observer } from 'mobx-react-lite'
import { motion, AnimatePresence } from "framer-motion";

export const TodoCardContainer = styled(motion.li)`
    border-bottom: 1px solid ${Colors.controlBorder};
    font-size: 12px;
    height: 52px;
    padding: 0.25em 1em;
    flex-grow: 100;
    display: flex;
    align-items: center;

    gap: 0 10px;

    &:last-child {
        border-bottom: none;
    }
`

export const TodoCardTitleInput = styled.input.attrs({ type: "text" })`
    color: black;
    flex-grow: 1;
`

export const TodoCard = observer(({ todo }: { todo: Todo }) => {
    return <TodoCardContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <CheckBox value={todo.isCompleted} onChange={e => { todo.toggleCompleted() }}/>
        <TodoCardTitleInput value={todo.title} onChange={e => { todo.renameTitle(e.target.value) }} />
    </TodoCardContainer>
})

const TodoListContainer = styled.ul`
    display: flex;
    flex-direction: column;
`

export const TodoList = observer(({ store }: { store: TodoStore }) => {
    return <TodoListContainer>
        <AnimatePresence>
        { store.todos.map(todo => <TodoCard todo={todo} key={todo.id}/>) }
        </AnimatePresence>
    </TodoListContainer>
}) 

export const TodoInputForm = styled.form`
    display: flex;
    width: 100%;
    padding: 0;
    gap: 0 20px;
`
