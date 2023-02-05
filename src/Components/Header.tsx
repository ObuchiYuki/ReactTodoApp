import React, { useState } from 'react';
import styled from 'styled-components'

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
    font-weight: 500;
`

export default function Header() {
    return (
        <HeaderContainer> 
            <HeaderTitle>TODO App</HeaderTitle>
        </HeaderContainer>
    )
}