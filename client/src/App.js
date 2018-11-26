import React from 'react'
import {Provider} from 'react-redux'
import store from './redux/store'
import Routes from './routes'
import {AppProvider} from 'AppContext/AppContext'

const App = () => (
  <AppProvider>
    <Provider store={store()}>
      <Routes />
    </Provider>
  </AppProvider>
)

export default App
