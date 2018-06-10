// @flow
import React from 'react'
import styled from 'react-emotion'
import { Context } from 'src/layouts/index'

export const BagButton = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background-color: #000000;
  border-radius: 50%;
  border: 0;
  outline: 0;
`

export const BagCount = styled('span')`
  color: #FFFFFF;
  line-height: 24px;
`

const Bag = () => (
  <Context.Consumer>
    {context => (
      <BagButton onClick={context.addToBag}>
        <BagCount>{context.bag}</BagCount>
      </BagButton>
    )}
  </Context.Consumer>
)

export default Bag
