// @flow
import React from 'react'
import styled from 'react-emotion'
// Components
import { Context } from 'src/layouts/index'
import StyledLink from 'src/components/StyledLink'
// Styles
import { fadeInLeftRight } from './animations.css.js'

export const SiteNavContainer = styled('nav')`
  margin-bottom: 2em;
`

export const SiteNavItem = styled(StyledLink)`
  display: block;
  animation: ${fadeInLeftRight} 0.75s ease;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 2em;
  color: #000000;
  &:hover {
    text-decoration: underline;
  }
`

const SiteNav = () => (
  <Context.Consumer>
    {context =>
      <SiteNavContainer>
        <SiteNavItem
          onClick={context.closeMenu}
          to='/'
          // TODO: Add active states.
          // isActive={(match, location) => {
          //   console.log(match, location)
          // }}
        >
          Home / Shop
        </SiteNavItem>
        <SiteNavItem
          onClick={context.closeMenu}
          to='/help'
        >
          Questions
        </SiteNavItem>
      </SiteNavContainer>
    }
  </Context.Consumer>
)

export default SiteNav
