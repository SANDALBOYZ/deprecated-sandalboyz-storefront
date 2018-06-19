// @flow
import React from 'react'
import styled from 'react-emotion'
// Apollo
import { graphql as graphqlConnect } from 'react-apollo'
import { checkoutLineItemsAdd } from 'src/api'
// Components
import { Context } from 'src/layouts/index'

const Product = () => (
  <div />
)

export default graphqlConnect(
  checkoutLineItemsAdd, { name: 'checkoutLineItemsAdd' }
)(props => (
  <Context.Consumer>
    {context => <Product {...props} context={context} />}
  </Context.Consumer>
))
