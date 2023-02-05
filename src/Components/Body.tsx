import React, { ReactNode } from 'react';
import styled from 'styled-components'

const Container = styled.div`
    padding: 10px
`

export default function Body({ children }: {
    children?: ReactNode
  }) {
    return (<Container>{children}</Container>)
}