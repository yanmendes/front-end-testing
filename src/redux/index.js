import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer, { initialState } from './reducer'

const enhancer =
  process.env.NODE_ENV !== 'test'
    ? compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    : applyMiddleware(thunk)

const configStore = () => createStore(reducer, initialState, enhancer)

export default configStore()
