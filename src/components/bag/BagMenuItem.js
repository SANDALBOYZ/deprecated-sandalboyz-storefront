// @flow
import React from 'react'
import styled from 'react-emotion'
// Apollo
import {
  compose,
  graphql as graphqlConnect
} from 'react-apollo'
import {
  checkoutLineItemsRemove,
  checkoutLineItemsUpdate
} from 'src/api'
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
    color: ${({ theme }) => theme.grayLight};
  }
`

export const PlusSign = styled('span')`
  &:before {
    content: '+';
    cursor: pointer;
    margin-left: 5px;
    color: ${({ theme }) => theme.grayLight};
  }
`

export const Price = styled('div')`
  color: ${({ theme }) => theme.grayLight};
`

type Props = {
  // ownProps
  context: Object,
  id: string | number,
  title: string,
  quantity: number,
  variant: { title: string, price: string },

  // graphql
  checkoutLineItemsRemove: Function
}

class BagMenuItem extends React.Component<Props> {
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

  decrementItem = () => {
    const { context, id } = this.props

    console.log(context.checkout)
    console.log(id)
  }

  incrementItem = () => {
    const { context, id } = this.props

    const lineItem = context.checkout.lineItems.edges.find(edge => edge.node.id === id).node

    lineItem.quantity += 1

    // TODO: pick off properties for proper https://help.shopify.com/en/api/custom-storefronts/storefront-api/reference/input_object/checkoutlineitemupdateinput

    this.props.checkoutLineItemsUpdate({
      variables: { checkoutId: context.checkout.id, lineItems: [lineItem] }
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
            <MinusSign onClick={this.decrementItem} />
            {quantity}
            <PlusSign onClick={this.incrementItem} />
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

export default compose(
  graphqlConnect(checkoutLineItemsRemove, { name: 'checkoutLineItemsRemove' }),
  graphqlConnect(checkoutLineItemsUpdate, { name: 'checkoutLineItemsUpdate' })
)(props => (
  <Context.Consumer>
    {context => <BagMenuItem {...props} context={context} />}
  </Context.Consumer>
))
