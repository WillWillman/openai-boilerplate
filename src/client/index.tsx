import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { config } from 'Client-Config';
import { Store } from 'Client-Store';
import { App } from './App';

const RootContainer = document.getElementById('container');

const RootComponent = <React.StrictMode>
  <Provider store={Store}>
    <BrowserRouter {...config.reactRouter}>
      <App />
    </BrowserRouter>
  </Provider>
</React.StrictMode>;


ReactDOM
  .createRoot(RootContainer)
  .render(RootComponent);
