// @flow
import React from 'react'
import styled from 'react-emotion'
import OutsideClickHandler from 'react-outside-click-handler'
import { Context } from 'src/layouts/index'

export const BagMenuContainer = styled('aside')`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => isOpen ? 0 : '-80%'};
  height: 100vh;
  width: 80%;
  background-color: ${({ theme }) => theme.gray};
  transition: right 0.45s ease-in-out 0.05s;
  z-index: 10;
`

const BagMenu = ({ isOpen }) => (
  <Context.Consumer>
    {context => (
      <React.Fragment>
        <OutsideClickHandler onOutsideClick={context.closeBag}>
          <BagMenuContainer isOpen={isOpen}>
            Bag
          </BagMenuContainer>
        </OutsideClickHandler>
      </React.Fragment>
    )}
  </Context.Consumer>
)

export default BagMenu
