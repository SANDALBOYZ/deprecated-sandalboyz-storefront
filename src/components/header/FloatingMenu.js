// @flow
import React from 'react'
import styled from 'react-emotion'
// Components
import SearchBar from './SearchBar'
import SiteNav from './SiteNav'
import SocialNav from './SocialNav'
// Styles
import { fadeIn } from './animations.css'

export const MenuContainer = styled('aside')`
  width: 100%;
  height: 500px;
  padding: 40px 20px;
  background-color: #FFFEF2;
  animation: ${fadeIn} 0.25s cubic-bezier(.15, .95, .65, .85);
  animation-delay: 2s;
  border-radius: 0 0 3px 3px;
`

const FloatingMenu = ({ isOpen }) => (
  isOpen &&
  <MenuContainer>
    <SearchBar />
    <SiteNav />
    <SocialNav />
  </MenuContainer>
)

export default FloatingMenu
