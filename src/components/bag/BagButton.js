// @flow
import React from 'react'
import styled, { css, keyframes } from 'react-emotion'
import { get } from 'lodash'
import { Context } from 'src/layouts/index'

export const bagPop = keyframes`
  0% {
    transform: scale(1);
  }

  80% {
    transform: scale(1.2);
  }

  90% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
`

export const addedToCartStyle = css`
  animation: ${bagPop} 0.3s ease-in-out;
`

export const BagButtonContainer = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.grayDark};
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

const BagButton = () => (
  <Context.Consumer>
    {context =>
      <BagButtonContainer
        onClick={context.toggleBag}
        className={context.addedToCart ? addedToCartStyle : undefined}
        onAnimationEnd={context.untoggleAddedToCart}
      >
        {calculateQuantity(get(context.checkout, 'lineItems.edges') || [])}
      </BagButtonContainer>
    }
  </Context.Consumer>
)

export default BagButton
