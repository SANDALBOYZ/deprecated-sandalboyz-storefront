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
  toggleMenu: Function,
  addToBag: Function
}

class App extends React.Component<Props, State> {
  constructor () {
    super()

    this.state = {
      menuOpen: false,
      bag: 0,
      toggleMenu: this.toggleMenu,
      addToBag: this.addToBag
    }
  }

  toggleMenu = () => {
    const { menuOpen } = this.state

    this.setState({ menuOpen: !menuOpen })
  }

  addToBag = () => {
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
          <div className='childrenContainer'>
            {children()}
          </div>
        </Context.Provider>
      </ThemeProvider>
    )
  }
}

export default App

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
