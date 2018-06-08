// @flow
import React from 'react'
import styled from 'react-emotion'
import { fadeInLeftRight } from './animations.css'

export const SocialNavContainer = styled('nav')`

`

export const SocialNavItemContainer = styled('div')`
  animation: ${fadeInLeftRight} 0.75s ease;
`

export const SocialNavItem = styled('a')`
  text-decoration: none;
  font-size: 1.4em;
  font-family: "adobe-caslon-pro";
  color: #000000;
  &:hover {
    text-decoration: underline;
  }
`

const INSTAGRAM = 'https://www.instagram.com/sandalboyz'
const TWITTER = 'https://www.twitter.com/sandalboyz'
const FACEBOOK = 'https://www.facebook.com/sandalboyz'

const SocialNav = () => (
  <SocialNavContainer>
    <SocialNavItemContainer>
      <SocialNavItem href={INSTAGRAM}>Instagram</SocialNavItem>
    </SocialNavItemContainer>
    <SocialNavItemContainer>
      <SocialNavItem href={TWITTER}>Twitter</SocialNavItem>
    </SocialNavItemContainer>
    <SocialNavItemContainer>
      <SocialNavItem href={FACEBOOK}>Facebook</SocialNavItem>
    </SocialNavItemContainer>
  </SocialNavContainer>
)

export default SocialNav
