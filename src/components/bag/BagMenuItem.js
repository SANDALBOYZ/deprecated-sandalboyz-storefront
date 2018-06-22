// @flow
import React from 'react'
import styled, { css } from 'react-emotion'
// Apollo
import { graphql as graphqlConnect } from 'react-apollo'
import { checkoutLineItemsRemove } from 'src/api'
import { Context } from 'src/layouts/index'
import Divider from './Divider'

export const BagMenuItemContainer = styled('div')`
  display: grid;
  grid-template-columns: 7fr 3fr;
  grid-template-rows: 20px 15px;
  grid-row-gap: 5px;
  font-family: "adobe-caslon-pro";
`

export const BagMenuItemTitle = styled('div')`
  font-size: 1.333rem;
`

export const BagMenuItemSubtitle = styled('div')`
  color: ${({ theme }) => theme.grayLight};
`

export const RemoveButton = styled('button')`
  margin-left: 10px;
  color: ${({ theme }) => theme.grayLight};
`

export const QuantityContainer = styled('div')`
  font-size: 1.4rem;
  cursor: default;
  display: flex;
  align-items: center;
  align-content: center;
`

export const MinusSign = styled('span')`
  &:before {
    content: '-';
    cursor: pointer;
    margin-right: 5px;
  }
`

export const PlusSign = styled('span')`
  &:before {
    content: '+';
    cursor: pointer;
    margin-left: 5px;
  }
`

export const Price = styled('div')`
  color: ${({ theme }) => theme.grayLight};
`

class BagMenuItem extends React.Component {
  removeItem = () => {
    const { context, id } = this.props

    this.props.checkoutLineItemsRemove({
      variables: { checkoutId: context.checkout.id, lineItemIds: [id] }
    }).then((res) => {
      context.setCheckout(
        res.data.checkoutLineItemsRemove.checkout
      )
    })
  }

  render () {
    const { title, quantity, variant } = this.props

    return (
      <React.Fragment>
        <BagMenuItemContainer>
          <BagMenuItemTitle>{title}</BagMenuItemTitle>
          <QuantityContainer>
            <MinusSign />
            {quantity}
            <PlusSign />
          </QuantityContainer>
          <BagMenuItemSubtitle>
            <span>{variant.title}</span>
            <RemoveButton onClick={this.removeItem}>Remove</RemoveButton>
          </BagMenuItemSubtitle>
          <Price>{Number(variant.price) * quantity}</Price>
        </BagMenuItemContainer>
        <Divider />
      </React.Fragment>
    )
  }
}

export default graphqlConnect(
  checkoutLineItemsRemove, { name: 'checkoutLineItemsRemove' }
)(props => (
  <Context.Consumer>
    {context => <BagMenuItem {...props} context={context} />}
  </Context.Consumer>
))
