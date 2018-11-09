import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import {AppRouter} from "./components/AppRouter";
//import getStore from './store';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";

//const store = getStore();
const store = true;

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
