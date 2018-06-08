// @flow
import React from 'react'
import Helmet from 'react-helmet'
// Components
import Header from 'src/components/header/Header'
// Styles
import { ThemeProvider } from 'emotion-theming'
import * as theme from 'src/theme'
import 'src/styles'

export const Context = React.createContext({})

type Props = {
  children: Function,
  data: any
}

type State = {
  menuOpen: boolean,
  bag: number,
  addToBag: Function
}

class Layout extends React.Component<Props, State> {
  constructor (props) {
    super(props)

    this.toggleMenu = this.toggleMenu.bind(this)
    this.addToBag = this.addToBag.bind(this)

    this.state = {
      menuOpen: false,
      bag: [],
      toggleMenu: this.toggleMenu,
      addToBag: this.addToBag
    }
  }

  toggleMenu () {
    const { menuOpen } = this.state

    this.setState({ menuOpen: !menuOpen })
  }

  addToBag () {
    const { bag } = this.state

    this.setState({ bag: bag + 1 })
  }

  render () {
    const { children, data } = this.props

    return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
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
