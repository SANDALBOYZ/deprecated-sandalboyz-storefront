/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.modifyWebpackConfig = ({ config, stage }) => (
  config.merge({
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src')
      }
    }
  })
)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
            title
            description
            variants {
              id
              title
              availableForSale
              price
            }
            images {
              originalSrc
            }
          }
        }
      }
    }
  `).then(({ data }) => {
    data.allShopifyProduct.edges.forEach(({ node: product }) => {
      createPage({
        path: `/products/${product.handle}`,
        component: path.resolve(__dirname, 'src/templates/ProductPageTemplate.js'),
        context: product
      })
    })
  })
}
