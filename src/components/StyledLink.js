// @flow
import React from 'react'
import Link from 'gatsby-link'

type StyledLinkProps = {
  className?: string,
  children?: any
}

export const StyledLink = ({
  className, children, ...props
}: StyledLinkProps) => (
  <Link className={className} {...props}>
    {children}
  </Link>
)

export default StyledLink
