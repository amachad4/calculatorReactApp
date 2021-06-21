import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { ArithContextProvider } from './store/arith-context.js';


ReactDOM.render(
  <ArithContextProvider>
    <App />
  </ArithContextProvider>,
  document.getElementById('root')
);
