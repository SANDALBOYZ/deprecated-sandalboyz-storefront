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
  top: 15px;
  margin-top: 15px;
`

export const HeaderBar = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 5px;
  margin: 0.6em 0.8em;
  height: ${props => props.level === 'top' ? '100px' : '30px'};
  background-color: ${props => props.level === 'hover'
    ? 'rgba(0, 0, 0, 0.5)'
    : 'rgba(0, 0, 0, 0)'
  };
  transition: height 0.5s ease, background-color 0.25s 0.5s ease;
`

export const logoContainer = css`
  position: relative;
  height: 100%;
  width: 100px;
`

export const CircleLogo = styled('div')`
  position: absolute;
  background-image: url(${circleLogo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 100px;
  width: 100px;
  transform: ${props => props.level === 'top' ? 'scale(1)' : 'scale(0)'};
  opacity: ${props => props.level === 'top' ? 1 : 0};
  transition: transform 0.25s ease, opacity 0.15s 0.1s ease;
`

export const TextLogo = styled('div')`
  position: absolute;
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
  height: 25px;
  width: 25px;
  line-height: 25px;
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
    if (yPosition >= 5 && yPosition < 15) return 'scrolled'
    if (yPosition >= 15) return 'hover'
  }

  render () {
    return (
      <Context.Consumer>
        {context => (
          <HeaderContainer level={this.level()}>
            <HeaderBar level={this.level()}>
              <Hamburger />
              <Link className={logoContainer} to='/'>
                <CircleLogo level={this.level()} />
                <TextLogo level={this.level()} />
              </Link>
              <Bag onClick={context.addToBag}>{context.bag.length}</Bag>
            </HeaderBar>
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
