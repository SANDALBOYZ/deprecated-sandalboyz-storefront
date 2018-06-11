// @flow
/**
 * This is the "All" products page.
 */
import React from 'react'
import ProductsList, { ProductsPageSynopsis } from 'src/components/products'

// Export this `fragment` so that it can be reused.
export const shopifyProductsFragment = graphql`
  fragment ShopifyProductsFragment on RootQueryType {
    allShopifyProduct {
      edges {
        node {
          id
          title
          variants {
            price
          }
          images {
            originalSrc
          }
        }
      }
    }
  }
`

const ProductsPage = ({ data }) => (
  <React.Fragment>
    <ProductsPageSynopsis
      title='All'
      synopsis='Anything and everything under the SANDALBOYZ sun.'
    />
    <ProductsList data={data} />
  </React.Fragment>
)

export default ProductsPage

export const query = graphql`
  query ProductsQuery {
    ...ShopifyProductsFragment
  }
`
