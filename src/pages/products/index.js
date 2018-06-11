// @flow
/**
 * This is the "All" products page.
 */
import React from 'react'
import ProductsPageSynopsis from 'src/components/products/ProductsPageSynopsis'
import Product from 'src/components/products/Product'

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
    <div className='productsContainer'>
      {
        data.allShopifyProduct.edges.map(({ node: product }) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            imageSrc={product.images[0].originalSrc}
            price={product.variants[0].price}
          />
        ))
      }
    </div>
  </React.Fragment>
)

export default ProductsPage

export const query = graphql`
  query ProductsQuery {
    ...ShopifyProductsFragment
  }
`
