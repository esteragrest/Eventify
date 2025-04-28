import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { userReducer, eventReducer, modalReducer } from './reducers'

const reducer = combineReducers({
	user: userReducer,
	event: eventReducer,
	modal: modalReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
