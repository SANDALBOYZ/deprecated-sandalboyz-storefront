import React from 'react'
import styled, { css } from 'react-emotion'
import { Context } from 'src/layouts/index.js'
// import Link from 'gatsby-link'
import Hamburger from 'src/components/hamburger/Hamburger'

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
  align-items: center;
  margin: 0.5em;
`

export const Bag = styled('button')`
  border: 0;
  outline: 0;
  border-radius: 50%;
  background-color: #000000;
  height: 25px;
  width: 25px;
  line-height: 25px;
  text-align: center;
  color: #FFFFFF;
`

const Header = ({ siteTitle }) => (
  <Context.Consumer>
    {context => (
      <HeaderContainer level='top'>
        <div className={header}>
          <Hamburger />
          <div>SANDALBOYZ</div>
          <Bag onClick={context.addToBag}>{context.bag.length}</Bag>
        </div>
      </HeaderContainer>
    )}
  </Context.Consumer>
)

export default Header
