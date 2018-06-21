// @flow
import React from 'react'
import styled from 'react-emotion'
import { get, isEmpty } from 'lodash'
// Apollo
import { graphql as graphqlConnect } from 'react-apollo'
import { createCheckout } from 'src/api'
// Components
import OutsideClickHandler from 'react-outside-click-handler'
import { Context } from 'src/layouts/index'
import Divider from './Divider'
import BagMenuItem from './BagMenuItem'
// import BagButton from './BagButton'

export const BagMenuContainer = styled('aside')`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => isOpen ? 0 : '-80%'};
  height: 100vh;
  width: 80%;
  background-color: ${({ theme }) => theme.gray};
  transition: right 0.45s ease-in-out 0.05s;
  z-index: 1000;
  color: white;
  padding: 20px 30px;
  padding-right: 0;
`

export const BagMenuHeader = styled('h2')`
  font-family: "adobe-caslon-pro";
  font-size: 1.666rem;
`

export const BagMenuItemList = styled('ul')`
  margin: 0;
`

export const EmptyBag = styled('div')`
  margin-bottom: 15px;
`

type BagMenuProps = {
  // context
  context: any,

  // graphql
  createCheckout: Function
}

class BagMenu extends React.Component<BagMenuProps> {
  componentDidMount () {
    this.props.createCheckout({
      variables: { input: {} }
    }).then((res) => {
      this.props.context.setCheckout(res.data.checkoutCreate.checkout)
    })
  }

  render () {
    const { context } = this.props
    const lineItems = get(context, 'checkout.lineItems.edges')
    const subtotalPrice = get(context, 'checkout.subtotalPrice')

    return (
      <OutsideClickHandler onOutsideClick={context.closeBag}>
        <BagMenuContainer isOpen={context.bagOpen}>
          <BagMenuHeader>Bag</BagMenuHeader>
          <Divider />
          <BagMenuItemList>
            {isEmpty(lineItems)
              ? <EmptyBag>Your bag is empty.</EmptyBag>
              : lineItems.map(({ node }) => (
                <BagMenuItem key={node.id} {...node} />
              ))
            }
          </BagMenuItemList>
          <div>Subtotal (Excluding Tax): {subtotalPrice} USD</div>
          <div>Checkout</div>
          <div>Free shipping and free returns on all United States orders</div>
        </BagMenuContainer>
      </OutsideClickHandler>
    )
  }
}

export default graphqlConnect(
  createCheckout, { name: 'createCheckout' }
)(props => (
  <Context.Consumer>
    {context => <BagMenu {...props} context={context} />}
  </Context.Consumer>
))
