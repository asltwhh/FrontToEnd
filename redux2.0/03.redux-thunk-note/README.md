<!-- TOC -->

- [1 中间件](#1-中间件)
  - [1.1 中间件的使用](#11-中间件的使用)
- [2 Redux-thunk 中间件](#2-redux-thunk-中间件)
  - [2.1 Redux-thunk 使用方法：](#21-redux-thunk-使用方法)

<!-- /TOC -->

Redux 中：action 发出，reducer 就会立即得到新的 state,这属于同步操作
问题：如何实现异步操作呢？？？ 异步：action 发出，过一段时间再执行 reducer
为了保证在异步操作结束后再自动 reducer,就需要使用新工具`中间件：Middleware`

# 1 中间件

中间件：一个函数，对 store.dispatch 进行了重定义，在发送 action 前，dispatch 后 reducer 前添加了其他的功能

    例如：下面的代码中就是在发送action前后增加了日志打印功能
    let next = store.dispatch;
    store.dispatch = function dispatchAndLog(action) {
        console.log('dispatching', action);
        next(action);
        console.log('next state', store.getState());
    }

## 1.1 中间件的使用

例如：使用一个现成的打印日志的中间件：redux-logger

    import { applyMiddleware, createStore } from 'redux';
    // redux-logger提供了一个生成器createLogger
    import createLogger from 'redux-logger';
    // 产生中间件logger
    const logger = createLogger();

    const store = createStore(
        reducer,
        applyMiddleware(logger)
    );

可以同时使用多个中间件：`applyMiddleware(thunk,logger)`,需要注意次序
所有中间件被放进了一个数组，然后嵌套执行，最后才执行 store.dispatch

# 2 Redux-thunk 中间件

异步操作至少需要发出两个 action:用户触发第一个 action,异步操作结束时，系统自动发出第二个 action,需要修改 action

    比如日常的注册操作，需要发送ajax请求确认此用户名是否已存在于数据库中，如果不存在才可以注册，所以只有拿到响应的结果后才可以dispatch(action),再修改state
    如果写成下面这样：
        fetch(`/some/API/${postTitle}.json`);
        dispatch(receivePosts('reactjs'));
        那么dispatch一定会先执行，因为请求需要时间，所以就等不到拿到请求结果后再dispatch(action)了

```
action.js

// 发出fetch请求
const requestPosts = (postTitle) => {type:postTitle};
// 得到fetch请求的结果,fetch响应成功
const receivePosts = (postTitle,result) => {type:postTitle,data:result};

const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle));
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
  };
};
```

上面代码中，fetchPosts 是一个 Action Creator（动作生成器），返回一个函数。这个函数执行后，先发出一个 Action（requestPosts(postTitle)），然后进行异步操作。拿到结果后，先将结果转成 JSON 格式，然后再发出一个 Action（ receivePosts(postTitle, json)）。

上面的函数中有几点需要注意的：

    （1）fetchPosts返回了一个函数，而普通的 Action Creator 默认返回一个对象。
    （2）返回的函数的参数是dispatch和getState这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。
    （3）在返回的函数之中，先发出一个 Action（requestPosts(postTitle)），表示操作开始。
    （4）异步操作结束之后，再发出一个 Action（receivePosts(postTitle, json)），表示操作结束。

**所以我们需要使用一个中间件去改造 store.dispatch 方法，使得其可以接收函数作为参数，这就是 redux-thunk 中间件做的事情：判断每个 action 如果是这个形式的{type:'',data}对象，则直接 reducer;如果是 function 类型就调用这个 function,并为其传入 dispatch 和 getState 方法。因为 reducer 是个纯函数，Redux 规定到达 reducer 的必须是一个 plain Object 类型{type:'',data}，纯函数不能对其参数进行修改**

Redux thunk 是 React 官方出品的 middleware 库，允许我们的 action creator(就是创建 action 对象的那个方法)返回一个函数，而不仅是一个对象。

    对于上面定义的action creator:fetchPosts,就可以直接`store.dispatch(fetchPosts('reactjs'))`了
        这个action就是一个函数类型，则会先执行这个函数
        action是fetchPosts('reactjs')的返回函数
    原来没有使用redux-thunk之前只能做到`store.dispatch(requestPosts('reactjs'))`
        判断action是什么类型：先执行requestPosts('reactjs')，得到的就是一个{}类型

## 2.1 Redux-thunk 使用方法：

安装 redux-thunk 插件：`npm install --save redux-thunk`

启动 redux-thunk 插件：需要使用 redux 包中的 applyMiddleware()方法启动,redux 版本需 3.1.0+

```
store.js

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)
```

配合 redux 调试工具:(两种方法)

    方法1：
        在createStore中添加第二个参数：window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        显而易见这个方法不能与redux-thunk同用
    方法2：
        下载chrome浏览器插件：redux-devtools
        安装依赖包:npm install redux-devtools-extension --save
            store.js

            import {createStore, applyMiddleware} from 'redux'
            import thunk from 'redux-thunk'
            import {composeWithDevTools} from 'redux-devtools-extension'

            import reducer from './reducer'

            const store = createStore(
                reducer,
                composeWithDevTools(applyMiddleware(thunk))
            )

学习了：https://www.cnblogs.com/chaoyuehedy/p/9713167.html
