import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
//this file is our entry point for webpack. importing our css file here allows webpacks style loader and css loader to bundle our css and put in on the dom
import '../public/index.css'

//entry point for our react components
ReactDOM.render(
  //this makes our redux store accessible to every react component
  <Provider store={store}>
    <div>Hello</div>
  </Provider>,
  document.getElementById('app')
)
