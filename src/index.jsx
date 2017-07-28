import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import {createStore, applyMiddleware} from 'redux';
import Reducer from './Reducers';
import { Provider } from 'react-redux';
import persistState from './util/persistState';

let store = createStore(Reducer);

render(
	<Provider store={store}>
		<App />
	</Provider>, document.querySelector("#app")
);


