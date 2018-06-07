// @flow
import React from 'react'
import styled from 'react-emotion'

export const MenuContainer = styled('div')`
  width: 100%;
  height: 500px;
  background-color: #FFFEF2;
`

const FloatingMenu = ({ isOpen }) => (
  <React.Fragment>
    { isOpen
      ? <MenuContainer>
        Menu
      </MenuContainer>
      : null
    }
  </React.Fragment>
)

export default FloatingMenu
