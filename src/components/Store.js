import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogPostReducer from '../reducers/blogPostReducer'
import userReducer from '../reducers/userReducer'

const reducer = combineReducers({
  blogPosts: blogPostReducer,
  user: userReducer
})

const Store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default Store