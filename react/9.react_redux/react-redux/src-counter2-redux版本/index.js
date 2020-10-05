import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

import {store} from './redux/store'

const render = () => {
  ReactDOM.render(
    // 将store对象传递给App组件，因为需要在App组件中修改状态值
      <App store={store}/>,
    document.getElementById('root')
  );
}

// 初始化渲染
render();

// 监听：当store中的状态发生改变，则调用render重新渲染组件App
store.subscribe(render);