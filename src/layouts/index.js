// @flow
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'react-emotion'
// Apollo
import client from 'src/api/client'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
// Components
import Header from 'src/components/header/Header'
import BagMenu from 'src/components/bag/BagMenu'
// Styles
import { ThemeProvider } from 'emotion-theming'
import * as theme from 'src/theme'
import 'src/styles'

client.query({
  query: gql`
    {
      shop {
        name
      }
    }
  `
}).then(result => console.log('omg apollo worked', result))

export const Context = React.createContext({})

export const AppWrapper = styled('div')`
  &:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.50);
    z-index: 900;
    opacity: ${({ bagOpen }) => bagOpen ? 1 : 0};
    visibility: ${({ bagOpen }) => bagOpen ? 'visible' : 'hidden'};
    transition: all 0.5s ease-in-out;
  }
`

export const ChildrenContainer = styled('div')`
  padding: 1.2em;
`

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
      closeMenu: this.closeMenu,
      toggleBag: this.toggleBag,
      closeBag: this.closeBag,
      addToBag: this.addToBag
    }
  }

  toggleMenu = () => {
    const { menuOpen } = this.state

    this.setState({ menuOpen: !menuOpen })
  }

  closeMenu = () => { this.setState({ menuOpen: false }) }

  toggleBag = () => {
    const { bagOpen } = this.state

    this.setState({ bagOpen: !bagOpen })
  }

  closeBag = () => { this.setState({ bagOpen: false }) }

  addToBag = () => {
    const { bag } = this.state

    this.setState({ bag: bag + 1 })
  }

  render () {
    const { children, data } = this.props

    return (
      <React.Fragment>
        <Helmet
          title={data.site.siteMetadata.title}
          // meta={}
        />
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Context.Provider value={this.state}>
              <AppWrapper bagOpen={this.state.bagOpen}>
                <Header siteTitle={data.site.siteMetadata.title} />
                <BagMenu isOpen={this.state.bagOpen} />
                <ChildrenContainer>
                  {children()}
                </ChildrenContainer>
              </AppWrapper>
            </Context.Provider>
          </ThemeProvider>
        </ApolloProvider>
      </React.Fragment>
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
