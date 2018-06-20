// @flow

type NodeTypeType = 'Product' | 'ProductVariant'

export const extractIdFromGatsbyId = (string: string, nodeType: NodeTypeType) => (
  string.replace(`Shopify__${nodeType}__`, '')
)
