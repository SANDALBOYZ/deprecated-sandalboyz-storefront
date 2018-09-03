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
  background-color: ${({ theme }) => theme.slate};
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

export const SubtotalContainer = styled('div')`
  display: grid;
  grid-template-columns: 7fr 3fr;
  grid-template-rows: 20px 15px;
  grid-row-gap: 5px;
  font-family: "adobe-caslon-pro";
`

export const CheckoutButton = styled('button')`
  width: 80%;
  height: 30px;
  margin: 1em 0;
  background-color: white;
  border-radius: 2px;
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    background-color: rgba(255,255,255,0.5);
  }
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`

export const FreeShip = styled('div')`
  font-size: 0.6em;
  color: ${({ theme }) => theme.grayLight};
`

type BagMenuProps = {
  // context
  context: any,

  // graphql
  createCheckout: Function
}

class BagMenu extends React.Component<BagMenuProps> {
  // NOTE: Shopify `checkout` object is created when this component mounts!
  // I'm not fully happy with this. We'll figure out a better solution later.
  componentDidMount () {
    this.props.createCheckout({
      variables: { input: {} }
    }).then((res) => {
      this.props.context.setCheckout(res.data.checkoutCreate.checkout)
    })
  }

  openCheckout = () => {
    const { context } = this.props
    window.open(context.checkout.webUrl)
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
          <SubtotalContainer>
            <div>
              Subtotal (Excluding Tax):
            </div>
            <div>
              {subtotalPrice} USD
            </div>
          </SubtotalContainer>
          <CheckoutButton
            onClick={this.openCheckout}
            disabled={isEmpty(lineItems)}
          >
            Checkout
          </CheckoutButton>
          <FreeShip>Free shipping and free returns on all United States orders.</FreeShip>
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
