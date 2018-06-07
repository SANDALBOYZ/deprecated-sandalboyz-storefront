import React from 'react'
import styled, { css } from 'react-emotion'
import { Context } from 'src/layouts/index'
// Components
import Link from 'gatsby-link'
import Hamburger from 'src/components/hamburger/Hamburger'
// Assets
import circleLogo from 'src/assets/img/sandalboyz-logo.png'
import textLogo from 'src/assets/img/sandalboyz-text-logo.png'

export const HeaderContainer = styled('header')`
  position: sticky;
  width: 100%;
  top: 0;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0.6em 0.8em;
`

export const HeaderBar = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 5px;
  height: 30px;
  background-color: ${props => props.level === 'hover'
    ? 'rgba(0, 0, 0, 0.3)'
    : 'rgba(0, 0, 0, 0)'
  };
  border-radius: 3px;
  transition: background-color 0.15s 0.25s ease;
`

export const CircleLogo = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${circleLogo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 80px;
  width: 80px;
  opacity: ${props => props.level === 'top' ? 1 : 0};
  transition: opacity 0.15s 0.1s ease;
`

export const TextLogo = styled('div')`
  background-image: url(${textLogo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 20px;
  width: 100px;
  transform: ${props => props.level === 'top' ? 'scale(0)' : 'scale(1)'};
  opacity: ${props => props.level === 'top' ? 0 : 1};
  transition: transform 0.25s ease, opacity 0.15s 0.1s ease;
`

export const Bag = styled('button')`
  border: 0;
  outline: 0;
  border-radius: 50%;
  background-color: #000000;
  height: 24px;
  width: 24px;
  line-height: 24px;
  text-align: center;
  color: #FFFFFF;
`

class Header extends React.Component {
  state = {
    yPosition: 0
  }

  componentDidMount () {
    document.addEventListener('scroll', () => {
      this.setState({ yPosition: window.scrollY })
    })
  }

  level () {
    const { yPosition } = this.state
    if (yPosition >= 0 && yPosition < 5) return 'top'
    if (yPosition >= 5 && yPosition < 30) return 'scrolled'
    if (yPosition >= 30) return 'hover'
  }

  render () {
    return (
      <Context.Consumer>
        {context => (
          <HeaderContainer level={this.level()}>
            <HeaderBar level={this.level()}>
              <Hamburger />
              <Link to='/'>
                <TextLogo level={this.level()} />
              </Link>
              <Bag onClick={context.addToBag}>{context.bag.length}</Bag>
            </HeaderBar>
            <CircleLogo level={this.level()} />
            <div style={{ position: 'fixed', left: 0, top: '50%' }}>
              {window.scrollY}
            </div>
          </HeaderContainer>
        )}
      </Context.Consumer>
    )
  }
}

export default Header
