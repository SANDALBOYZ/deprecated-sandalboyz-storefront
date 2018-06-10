// @flow
/**
 * This root index will default to `products/index`.
 */

export default from './products'

export const query = graphql`
  query IndexQuery {
    ...ShopifyProductsFragment
  }
`
