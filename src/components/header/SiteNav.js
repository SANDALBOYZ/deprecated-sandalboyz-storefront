// @flow
import React from 'react'
import styled from 'react-emotion'
import StyledLink from 'src/components/StyledLink'
import { fadeInLeftRight } from './animations.css'

export const SiteNavContainer = styled('nav')`
  margin-bottom: 2em;
`

export const SiteNavItemContainer = styled('div')`
  animation: ${fadeInLeftRight} 0.75s ease;
`

export const SiteNavItem = styled(StyledLink)`
  text-decoration: none;
  text-transform: uppercase;
  font-size: 2em;
  color: #000000;
  &:hover {
    text-decoration: underline;
  }
`

const SiteNav = () => (
  <SiteNavContainer>
    <SiteNavItemContainer>
      <SiteNavItem to='/'>Home</SiteNavItem>
    </SiteNavItemContainer>
    <SiteNavItemContainer>
      <SiteNavItem to='/help'>Questions</SiteNavItem>
    </SiteNavItemContainer>
  </SiteNavContainer>
)

export default SiteNav
