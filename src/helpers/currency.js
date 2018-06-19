// @flow

export const truncatePrice = (priceString: string): string =>
  priceString.split('.')[0]
