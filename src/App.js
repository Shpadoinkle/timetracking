import {Provider as MobxProvider} from 'mobx-react'
import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import './App.css'
import ScrollToTop from './components/ScrollToTop'
import appStore from './mobx/app'
import themeStore from './mobx/theme'
import Timers from './pages/Timers'

function App() {
  return (
    <MobxProvider appStore={appStore}>
      <ThemeProvider theme={themeStore}>
        <BrowserRouter>
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={Timers} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </MobxProvider>
  )
}

export default App
