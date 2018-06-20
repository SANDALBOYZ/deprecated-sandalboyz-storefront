// @flow
import React from 'react'
import styled, { css, keyframes } from 'react-emotion'
import { get } from 'lodash'
import { Context } from 'src/layouts/index'

export const bagPop = keyframes`
  0% {
    width: 25px;
    height: 25px;
  }

  80% {
    width: 28px;
    height: 28px;
  }

  100% {
    width: 25px;
    height: 25px;
  }
`

export const addedToCartStyle = css`
  animation: ${bagPop} 0.5s ease-in-out;
`

export const BagButtonContainer = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 25px;
  height: 25px;
  background-color: ${({ theme, menuOpen }) => {
    return menuOpen
      ? theme.grayLight
      : theme.grayDark
  }};
  border-radius: 50%;
  border: 0;
  outline: 0;
  transition: background-color 2s ease;
  color: white;
  line-height: 25px;
`

const calculateQuantity = (edges: Array<Object>): number => (
  edges.reduce((total, edge) => {
    total += edge.node.quantity
    return total
  }, 0)
)

class BagButton extends React.Component {
  state = {
    addedToCart: false
  }

  addedToBagCallback = () => {
  }

  render () {
    const { context } = this.props

    return (
      <BagButtonContainer
        onClick={context.toggleBag}
        menuOpen={context.menuOpen}
        className={this.state.addedToCart ? addedToCartStyle : undefined}
        onAnimationEnd={() => this.setState({ addedToCart: false })}
      >
        {calculateQuantity(get(context.checkout, 'lineItems.edges') || [])}
      </BagButtonContainer>
    )
  }
}

export default props => (
  <Context.Consumer>
    {context => <BagButton {...props} context={context} />}
  </Context.Consumer>
)
