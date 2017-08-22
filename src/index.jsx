import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import reducer from './Reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


let store = createStore(reducer, applyMiddleware(thunk));

render(
	<Provider store={store}>
		<App />
	</Provider>, document.querySelector("#app")
);


