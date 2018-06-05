// @flow
import React from 'react'
import Helmet from 'react-helmet'
// Components
import Header from 'src/components/Header'
// Styles
import 'src/styles'

export const Context = React.createContext({
  bag: []
})

type Props = {
  children: Function,
  data: any
}

type State = {
  bag: number,
  addToBag: Function
}

class Layout extends React.Component<Props, State> {
  constructor (props) {
    super(props)

    this.addToBag = this.addToBag.bind(this)

    this.state = {
      bag: [],
      addToBag: this.addToBag
    }
  }

  addToBag () {
    const { bag } = this.state

    this.setState({ bag: bag + 1 })
  }

  render () {
    const { children, data } = this.props

    return (
      <Context.Provider value={this.state}>
        <Helmet
          title={data.site.siteMetadata.title}
          // meta={}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>
          {children()}
        </div>
      </Context.Provider>
    )
  }
}

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
