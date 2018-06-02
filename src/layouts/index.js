// @flow
import React from 'react'
import Helmet from 'react-helmet'
// Components
import Header from '../components/header'
// Styles
import './reset.css'

type Props = {
  children: Function,
  data: any
}

const Layout = ({ children, data }: Props) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div>
      {children()}
    </div>
  </div>
)

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
