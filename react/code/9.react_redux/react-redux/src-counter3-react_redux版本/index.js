import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './redux/store'
import {Provider} from 'react-redux'

import App from './containers/app';
import './index.css';

ReactDOM.render(
  // 将store对象传递给App组件，因为需要在App组件中修改状态值
    
    (
    <Provider store={store}>
      <App />
    </Provider>
    ),
  document.getElementById('root')
);