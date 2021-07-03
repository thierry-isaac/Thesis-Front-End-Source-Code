 import {createStore, combineReducers, applyMiddleware } from "redux"
 import thunkMiddleware from "redux-thunk"
 import {composeWithDevTools} from "redux-devtools-extension/developmentOnly"

 import CartItem from "./reducers/cart"

 const reducer = combineReducers({
     cart: CartItem
 })

 const store = createStore(
     reducer,
     composeWithDevTools(applyMiddleware(thunkMiddleware))
 )

 export default store;