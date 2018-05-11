import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@paciolan/pac-components/dist/theme'

import theme from '../global/config/styles'

import Home from '../pages/Home'

const _ApplicationWindow = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: ${props => props.theme.defaultFontFamily};
`

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <_ApplicationWindow>
                    <Switch>
                        <Route exact path='/' component={Home} />
                    </Switch>
                </_ApplicationWindow>
            </Router>
        </ThemeProvider>
    )
}

export default App
