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
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  opacity: ${({ animationEnded }) => animationEnded ? 1 : 0};
  width: 100%;
  height: 500px;
  padding: 40px 20px;
  background-color: #FFFEF2;
  animation: ${fadeIn} 0.5s cubic-bezier(.15, .95, .65, .85) 0.25s;
  border-radius: 0 0 3px 3px;
`
type Props = {}

type State = {
  animationEnded: boolean
}

class FloatingMenu extends React.Component<Props, State> {
  state = {
    animationEnded: false
  }

  render () {
    return (
      <MenuContainer
        onAnimationEnd={() => this.setState({ animationEnded: true })}
        animationEnded={this.state.animationEnded}
      >
        <SearchBar />
        <SiteNav />
        <SocialNav />
      </MenuContainer>
    )
  }
}

export default FloatingMenu
