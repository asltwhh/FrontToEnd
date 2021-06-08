import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'
import {BrowserRouter, HashRouter} from 'react-router-dom'

ReactDOM.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ),
  document.getElementById('root'));

