// @flow
import React from 'react'
import styled from 'react-emotion'
// Apollo
import { graphql as graphqlConnect } from 'react-apollo'
import { createCheckout } from 'src/api'
// Components
import OutsideClickHandler from 'react-outside-click-handler'
import { Context } from 'src/layouts/index'
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
`

export const BagMenuHeader = styled('div')`
  padding: 10px;
  margin-bottom: 10px;
`

export const BagMenuItemList = styled('ul')`

`

export const BagMenuItem = styled('li')`

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

    return (
      <OutsideClickHandler onOutsideClick={context.closeBag}>
        <BagMenuContainer isOpen={context.bagOpen}>
          <BagMenuHeader>
            <h2>Bag</h2>
          </BagMenuHeader>
          <BagMenuItemList>
            <BagMenuItem>Item 1</BagMenuItem>
            <BagMenuItem>Item 2</BagMenuItem>
            <BagMenuItem>Item 3</BagMenuItem>
          </BagMenuItemList>
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
