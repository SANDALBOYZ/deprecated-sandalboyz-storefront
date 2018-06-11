// @flow
import React from 'react'
import styled from 'react-emotion'
import { Context } from 'src/layouts/index'

export const BagButton = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: ${({ theme, menuOpen }) => {
    return menuOpen
      ? theme.grayLight
      : theme.grayDark
  }};
  border-radius: 50%;
  border: 0;
  outline: 0;
  transition: background-color 2s ease;
`

export const BagCount = styled('span')`
  color: #FFFFFF;
  line-height: 24px;
`

const Bag = () => (
  <Context.Consumer>
    {context => (
      <BagButton onClick={context.addToBag} menuOpen={context.menuOpen}>
        <BagCount>{context.bag}</BagCount>
      </BagButton>
    )}
  </Context.Consumer>
)

export default Bag
