// 入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import {store} from './redux/store'
import App from './containers/app/app'

ReactDOM.render(
  (
    <Provider store={store}>
        <App />
    </Provider>
  ), 
  document.getElementById('root')
);
