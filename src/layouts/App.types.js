// @flow

export type CheckoutType = {
  id: string,
  lineItems: Array<Object>,
  subtotalPrice: string,
  totalPrice: string,
  totalTax: string,
  webUrl: string,
  __typename: 'Checkout'
}
