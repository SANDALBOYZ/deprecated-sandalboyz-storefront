// @flow
import React from 'react'
import styled from 'react-emotion'
import { fadeInLeftRight } from './animations.css.js'

export const SocialNavContainer = styled('nav')`
  margin-top: 14em;
`

export const SocialNavItem = styled('a')`
  display: block;
  animation: ${fadeInLeftRight} 0.75s ease;
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
    <SocialNavItem href={INSTAGRAM}>Instagram</SocialNavItem>
    <SocialNavItem href={TWITTER}>Twitter</SocialNavItem>
    <SocialNavItem href={FACEBOOK}>Facebook</SocialNavItem>
  </SocialNavContainer>
)

export default SocialNav
