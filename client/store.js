//applyMiddleware is the second param in createStore
import { createStore, applyMiddleware } from 'redux'
import dummyReducer from './redux/dummyReducer'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const store = createStore(
  dummyReducer,
  //notice applyMiddleware is a function
  applyMiddleware(
    thunkMiddleware,
    //so is createLogger!
    createLogger()
  )
)

export default store
