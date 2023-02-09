import React, { ReactNode } from 'react';
import styled from 'styled-components'

import { Size, Shadow } from "../Const"

const HeaderContainer = styled.div`
  background: white;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const HeaderTitle = styled.h1`
    font-size: 20px;
    font-weight: 700;
`

export function Header() {
    return (
        <HeaderContainer> 
            <HeaderTitle>TODO App</HeaderTitle>
        </HeaderContainer>
    )
}

const BodyContainer = styled.div`
    padding: 10px;
`

export function Body({ children }: { children?: ReactNode }) {
    return (<BodyContainer>{children}</BodyContainer>)
}

export const AppContaner = styled.div`
    margin: 12px;
    display: flex;
    justify-content: center;
`

export const AppCard = styled.div`
    padding: 12px;
    padding-top: 0;
    width: 80%;
    max-width: 560px;
    background: white;
    border-radius: ${Size.corner};
    box-shadow: ${Shadow.card};
    display: flex;
    flex-direction: column;
    gap: 12px 0;
`

export const Footnote = styled.p`
color: #b1b1b1;
font-size: 12px;
`
