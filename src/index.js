import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { reducers } from './redux';
import App from './containers/App/App';
import './styles/index.scss';

const store = createStore(reducers, applyMiddleware(thunk));

axios.defaults.baseURL = 'http://192.168.99.100:8080';
axios.defaults.auth = {
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
};

console.log(process.env.USERNAME)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
