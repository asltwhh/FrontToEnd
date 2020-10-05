import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {counter} from './reducers'

// 1 创建一个store对象,首先得创建一个counter对象，在./redux/reducers.jsx中
// 在创建store对象时，会默认调用counter方法，实现状态的初始化
export const store = createStore(
    counter,
    composeWithDevTools(applyMiddleware(thunk))
)