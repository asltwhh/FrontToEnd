Redux中：action发出，reducer就会立即得到新的state,这属于同步操作
问题：如何实现异步操作呢？？？ 异步：action发出，过一段时间再执行reducer
为了保证在异步操作结束后再自动reducer,就需要使用新工具`中间件：Middleware`

## 1.1 中间件

中间件：一个函数，对store.dispatch进行了重定义，在发送action前，dispatch后reducer前添加了其他的功能

    例如：下面的代码中就是在发送action前后增加了日志打印功能
    let next = store.dispatch;
    store.dispatch = function dispatchAndLog(action) {
        console.log('dispatching', action);
        next(action);
        console.log('next state', store.getState());
    }

## 1.2 中间件的使用

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
所有中间件被放进了一个数组，然后嵌套执行，最后才执行store.dispatch

# 2 Redux-thunk中间件

异步操作至少需要发出两个action:用户触发第一个action,异步操作结束时，系统自动发出第二个action,需要修改action

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
上面代码中，fetchPosts是一个Action Creator（动作生成器），返回一个函数。这个函数执行后，先发出一个Action（requestPosts(postTitle)），然后进行异步操作。拿到结果后，先将结果转成 JSON 格式，然后再发出一个 Action（ receivePosts(postTitle, json)）。

上面的函数中有几点需要注意的：

    （1）fetchPosts返回了一个函数，而普通的 Action Creator 默认返回一个对象。
    （2）返回的函数的参数是dispatch和getState这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。
    （3）在返回的函数之中，先发出一个 Action（requestPosts(postTitle)），表示操作开始。
    （4）异步操作结束之后，再发出一个 Action（receivePosts(postTitle, json)），表示操作结束。

**所以我们需要使用一个中间件去改造store.dispatch方法，使得其可以接收函数作为参数，这就是redux-thunk中间件做的事情：判断每个action如果是这个形式的{type:'',data}对象，则直接reducer;如果是function类型就调用这个function,并为其传入dispatch和getState方法。因为reducer是个纯函数，Redux规定到达reducer的必须是一个plain Object类型{type:'',data}，纯函数不能对其参数进行修改**

Redux thunk 是React官方出品的middleware库，允许我们的action creator(就是创建action对象的那个方法)返回一个函数，而不仅是一个对象。 

    对于上面定义的action creator:fetchPosts,就可以直接`store.dispatch(fetchPosts('reactjs'))`了
        这个action就是一个函数类型，则会先执行这个函数
        action是fetchPosts('reactjs')的返回函数
    原来没有使用redux-thunk之前只能做到`store.dispatch(requestPosts('reactjs'))`
        判断action是什么类型：先执行requestPosts('reactjs')，得到的就是一个{}类型

## 2.1 Redux-thunk使用方法：

安装 redux-thunk 插件：`npm install --save redux-thunk`

启动redux-thunk 插件：需要使用redux包中的applyMiddleware()方法启动,redux版本需3.1.0+

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

配合redux调试工具:(两种方法)

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