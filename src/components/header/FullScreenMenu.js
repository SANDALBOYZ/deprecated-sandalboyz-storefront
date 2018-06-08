// @flow
import React from 'react'
import styled, { css } from 'react-emotion'
// Components
import Link from 'gatsby-link'

export const MenuContainer = styled('aside')`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 15px;
  background-color: #FFFEF2;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  transition: opacity 0.25s cubic-bezier(.15, .95, .65, .85);
  z-index: 9;
`

export const MenuContent = styled('div')`
  margin-top: 120px;
`

export const SearchBarContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin-bottom: 2em;
  padding: 2px 5px;
  width: 100%;
`

export const SearchBar = styled('input')`
  border: 0;
  outline: 0;
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
  font-family: serif;
  font-style: italic;
  font-size: 1.6em;
  width: 100%;
`

export const SearchArrow = styled('button')`
  &:after {
    content: '>>'
  }
`

export const Nav = styled('nav')`

`

export const NavItemContainer = styled('div')`
  text-transform: uppercase;
  list-style-type: none;
  font-size: 2em;
`

export const NavItemLink = ({ className, children, ...props }) => (
  <Link className={className} {...props}>
    {children}
  </Link>
)

export const NavItem = styled(NavItemLink)`
  text-decoration: none;
  color: #000000;
  &:hover {
    text-decoration: underline;
  }
`

type FullScreenMenuProps = {
  isOpen: boolean,
}

const FullScreenMenu = ({ isOpen }: FullScreenMenuProps) => (
  <MenuContainer isOpen={isOpen}>
    <MenuContent>
      <SearchBarContainer>
        <SearchBar placeholder='Search' />
        <SearchArrow />
      </SearchBarContainer>
      <Nav>
        <NavItemContainer>
          <NavItem to='/'>Home</NavItem>
        </NavItemContainer>
        <NavItemContainer>
          <NavItem to='/help'>Questions</NavItem>
        </NavItemContainer>
      </Nav>
    </MenuContent>
  </MenuContainer>
)

export default FullScreenMenu
