import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'

//entry point for our react components
ReactDOM.render(
  //this makes our redux store accessible to every react component
  <Provider store={store}>
    <div>Hello</div>
  </Provider>,
  document.getElementById('app')
)
