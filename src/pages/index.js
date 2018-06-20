// @flow
/**
 * This root index will default to `products/index`.
 */
import ProductsPage from './products'

export default ProductsPage

declare var graphql: any

export const query = graphql`
  query IndexQuery {
    ...ShopifyProductsFragment
  }
`
