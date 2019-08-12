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

axios.baseUrl = 'some url';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
