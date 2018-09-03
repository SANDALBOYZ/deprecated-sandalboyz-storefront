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

type OwnProps = {
  context: Object,
  id: string | number, // `id` is passed from an interator in `BagMenu`.
  title: string,
  quantity: number,
  variant: { title: string, price: string }
}

type PropsFromApollo = {
  checkoutLineItemsRemove: Function,
  checkoutLineItemsUpdate: Function
}

type Props = OwnProps & PropsFromApollo

type State = {
  diabled: boolean
}

class BagMenuItem extends React.Component<Props, State> {
  state = {
    disabled: false
  }

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

  // TODO: DRY decrement and increment.
  decrementItem = () => {
    const { context, id } = this.props

    const lineItem = context.checkout.lineItems.edges.find(edge => edge.node.id === id).node

    const updatedLineItem = {
      id: lineItem.id,
      quantity: lineItem.quantity - 1,
      variantId: lineItem.variant.id
    }

    this.setState({ disabled: true })

    this.props.checkoutLineItemsUpdate({
      variables: { checkoutId: context.checkout.id, lineItems: [updatedLineItem] }
    }).then((res) => {
      this.setState({ disabled: false })
      context.setCheckout(
        res.data.checkoutLineItemsUpdate.checkout
      )
    })
  }

  incrementItem = () => {
    const { context, id } = this.props

    const lineItem = context.checkout.lineItems.edges.find(edge => edge.node.id === id).node

    const updatedLineItem = {
      id: lineItem.id,
      quantity: lineItem.quantity + 1,
      variantId: lineItem.variant.id
    }

    this.setState({ disabled: true })

    this.props.checkoutLineItemsUpdate({
      variables: { checkoutId: context.checkout.id, lineItems: [updatedLineItem] }
    }).then((res) => {
      this.setState({ disabled: false })
      context.setCheckout(
        res.data.checkoutLineItemsUpdate.checkout
      )
    })
  }

  render () {
    const { title, quantity, variant } = this.props
    const { disabled } = this.state

    return (
      <React.Fragment>
        <BagMenuItemContainer>
          <BagMenuItemTitle>{title}</BagMenuItemTitle>
          <QuantityContainer>
            <MinusSign
              disabled={disabled}
              onClick={disabled ? null : this.decrementItem}
            />
            {disabled ? 'Updating...' : quantity}
            <PlusSign
              disabled={disabled}
              onClick={disabled ? null : this.incrementItem}
            />
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
