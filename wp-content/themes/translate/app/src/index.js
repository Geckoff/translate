import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-notifications/lib/notifications.css';
import AppRouter from "./components/AppRouter";
import getStore from './store';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { LastLocationProvider } from 'react-router-last-location';

const store = getStore();

ReactDOM.render(
  <BrowserRouter>
    <LastLocationProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </LastLocationProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
