import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import reducer from './Reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'whatwg-fetch';
import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}


let store = createStore(reducer, applyMiddleware(thunk));

render(
	<Provider store={store}>
		<App />
	</Provider>, document.querySelector("#app")
);


