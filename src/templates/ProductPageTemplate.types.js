// @flow

// `pathContext` comes from `gatsby-node.js`.
export type PathContextType = {
  id: string,
  handle: string,
  title: string,
  images: Array<Object>,
  variants: Array<Object>
}

export type VariantType = {
  isDisabled: boolean,
  label: string,
  value: string // Corresponds to the ID of the variant.
}
