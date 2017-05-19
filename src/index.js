import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import MainPage from './components/MainPage/MainPage'
import reducer from './redux/reducer'
import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'


// const loggerMiddleware = createLogger()
const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware
        // loggerMiddleware
    )
)


ReactDOM.render(
    <Provider store={store}>
        <MainPage store={store} />
    </Provider>,
    document.getElementById('root')
)



