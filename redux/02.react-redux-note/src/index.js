import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import TodoList from './todoList——connect第二个参数以对象形式传入'
import store from './store/index'

ReactDOM.render(
  (
    <Provider store={store}>
      <TodoList />
    </Provider>
  ),
  document.getElementById('root')
);
