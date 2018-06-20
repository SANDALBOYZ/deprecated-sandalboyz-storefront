// @flow

// NOTE: These come from `gatsby-source-shopify` plugin.
type NodeTypeType =
  'Product' |
  'ProductVariant' |
  'ProductOption' |
  'Article'

// This helper function replaces the `Shopify__ProductVariant__` that gets
// prepended by `gatsby-source-shopify`.
export const extractIdFromGatsbyId = (string: string, nodeType: NodeTypeType) => (
  string.replace(`Shopify__${nodeType}__`, '')
)
