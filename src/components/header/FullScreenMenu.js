// @flow
import React from 'react'
import styled from 'react-emotion'
// Components
import SiteNav from './SiteNav'
import SocialNav from './SocialNav'
// Styles
import { fadeIn } from './animations.css'

export const MenuContainer = styled('aside')`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 15px;
  background-color: #FFFEF2;
  z-index: 9;
  animation: ${fadeIn} 0.25s cubic-bezier(.15, .95, .65, .85);
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
  background: none;
  padding: 0;
  font-family: serif;
  font-style: italic;
  font-size: 1.6em;
  width: 100%;
`

export const SearchArrow = styled('button')`
  &:after {
    content: ">>"
  }
`

type FullScreenMenuProps = {
  isOpen: boolean,
}

const FullScreenMenu = ({ isOpen }: FullScreenMenuProps) => (
  isOpen &&
  <MenuContainer>
    <MenuContent>
      <SearchBarContainer>
        <SearchBar placeholder='Search' />
        <SearchArrow />
      </SearchBarContainer>
      <SiteNav />
      <SocialNav />
    </MenuContent>
  </MenuContainer>
)

export default FullScreenMenu
