// @flow
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://sandalboyz-2.myshopify.com/api/graphql',
  headers: {
    'X-Shopify-Storefront-Access-Token': 'a6a2961ca8f4beaf87aedf3d74c38114'
  }
})

export default client
