// @flow
import React from 'react'
import styled from 'react-emotion'
// Components
import SearchBar from './SearchBar'
import SiteNav from './SiteNav'
import SocialNav from './SocialNav'
// Styles
import { fadeIn } from './animations.css.js'

export const MenuContainer = styled('aside')`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 15px;
  background-color: ${({theme}) => theme.offWhite};
  z-index: 9;
  animation: ${fadeIn} 0.25s cubic-bezier(.15, .95, .65, .85);
`

export const MenuContent = styled('div')`
  margin-top: 120px;
`

const FullScreenMenu = () => (
  <MenuContainer>
    <MenuContent>
      <SearchBar />
      <SiteNav />
      <SocialNav />
    </MenuContent>
  </MenuContainer>
)

export default FullScreenMenu
