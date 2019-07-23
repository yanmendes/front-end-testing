import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App'
import Success from './Success'
import store from './redux'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/form-redirect' exact component={Success} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
