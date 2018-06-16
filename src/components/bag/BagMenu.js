// @flow
import React from 'react'
import styled from 'react-emotion'
import OutsideClickHandler from 'react-outside-click-handler'
import { Context } from 'src/layouts/index'
// Components
import BagButton from './BagButton'

export const BagMenuContainer = styled('aside')`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => isOpen ? 0 : '-80%'};
  height: 100vh;
  width: 80%;
  background-color: ${({ theme }) => theme.gray};
  transition: right 0.45s ease-in-out 0.05s;
  z-index: 1000;
  color: white;
`

export const BagMenuHeader = styled('div')`
  padding: 10px;
  margin-bottom: 10px;
`

const BagMenu = ({ isOpen }) => (
  <Context.Consumer>
    {context => (
      <OutsideClickHandler onOutsideClick={context.closeBag}>
        <BagMenuContainer isOpen={isOpen}>
          <BagMenuHeader>
            <h2>Bag</h2>

          </BagMenuHeader>
        </BagMenuContainer>
      </OutsideClickHandler>
    )}
  </Context.Consumer>
)

export default BagMenu
