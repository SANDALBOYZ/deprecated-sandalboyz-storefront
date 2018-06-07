// @flow
import React from 'react'
import styled from 'react-emotion'

export const MenuContainer = styled('aside')`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #FFFEF2;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  transition: opacity 0.25s cubic-bezier(.15, .95, .65, .85);
  z-index: 9;
`

export const Content = styled('nav')`
  margin-top: 100px;
`

export const SearchBar = styled('div')`

`

export const MenuItem = styled('li')`
  text-transform: uppercase;
  list-style-type: none;
`

const FullScreenMenu = ({ isOpen }) => (
  <MenuContainer isOpen={isOpen} >
    <Content>
      <ul>
        <MenuItem>Shop / Home</MenuItem>
        <MenuItem>Questions</MenuItem>
      </ul>
    </Content>
  </MenuContainer>
)

export default FullScreenMenu
