import React from 'react'
import styled, { css } from 'react-emotion'
// import Link from 'gatsby-link'

export const HeaderContainer = styled('header')`
  position: ${(props) => {
    switch (props.level) {
      case 'top':
        return 'relative'
      case 'scrolled':
        return 'fixed'
    }
  }};
  top: 0;
  width: 100%;
`
export const header = css`
  display: flex;
  justify-content: space-between;
  margin: 0.5em;
`

export const Hamburger = styled('button')`
  
`

const Header = ({ siteTitle }) => (
  <HeaderContainer level='top'>
    <div className={header}>
      <div>Hamburger</div>
      <div>SANDALBOYZ</div>
      <div>Bag</div>
    </div>
  </HeaderContainer>
)

export default Header
