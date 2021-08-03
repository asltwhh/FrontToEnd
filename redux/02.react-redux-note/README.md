<!-- TOC -->

- [React-Redux](#react-redux)
  - [1. <Provider>提供器](#1-provider提供器)
  - [2 connect 连接器的使用——第一个参数(映射关系)](#2-connect-连接器的使用第一个参数映射关系)
  - [3 改变 store 对象中数据](#3-改变-store-对象中数据)
  - [4 派发 action 到 store 中](#4-派发-action-到-store-中)

<!-- /TOC -->

# React-Redux

## 1. <Provider>提供器

Provider 是一个提供器，只要使用了这个组件，该组件中的其他组件就都可以使用`store`对象了，这也是`React-Redux`的核心组件了。所以为了方便其他组件使用 store 对象，就需要使用`Provider`组件将应用中的所有组件包围，就需要修改`./src/index.js`文件的内容：

    (1) 使用`Provider`组件将应用中的所有组件包围
    (2) 引入store对象，并且将其直接传递给Provider的子组件

```
import React from 'react';
import ReactDOM from 'react-dom';
// （1）引入Provider组件
import {Provider} from 'react-redux'

import TodoList from './todoList'
// 2 引入store对象
import store from './store/index'

ReactDOM.render(
  (
    {/* 3 使用Provider组件包围整个应用，并且传递store对象 */}
    <Provider store={store}>
      <TodoList />
    </Provider>
  ),
  document.getElementById('root')
);
```

## 2 connect 连接器的使用——第一个参数(映射关系)

connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options])

> - connect 的第一个参数是 mapStateToProps ，将 store 中的数据作为 props 绑定到组件上
>     - 如果定义该参数，组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。如果你省略了这个参数，你的组件将不会监听 Redux store。
>
> - connect 的第二个参数是 mapDispatchToProps，它的功能是，将 产生action对象的方法 作为 props 绑定到组件上。
>     - 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果某个方法被触发，会产生对应的action对象，并且**自动进行dispatch触发reducer产生新的state并且返回到store中**。代码参见：[函数形式](./src/todoList——connect第二个参数以对象形式传入.js)
>     - 如果传递的是一个函数，该函数将接收一个 dispatch 参数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起。 此时dispatch就是显示存在于代码中的。 代码参见：[对象形式](./src/todoList——connect第二个参数以函数形式传入.js),下面用到的就是函数形式，个人感觉这种容易理解一些

connect 是一个连接器，它可以帮组件很方便地使用 store 对象中的数据

    （1）引入connect连接器
    （2）改变暴露的组件，将暴露的内容改为connect连接器
    （3）定义映射关系函数，将store对象中的state映射为组件(例子中是TodoList)中的props属性
    （4）在该组件中使用state中的属性的地方进行修改，直接从props中取值即可

可以发现第一个映射关系是将 state 传递给组件，从而改变 input 表单项的内容

```
import React, { Component } from 'react';
import {connect} from 'react-redux'

import store from './store/index'

class TodoList extends Component {
    render() {
        // 4 在该组件中使用state中的属性的地方进行修改，直接从props中取值即可
        const {inputValue} = this.props;
        return (
            <div>
                <div>
                    <input value={inputValue}/>
                    <button>提交</button>
                </div>
                <ul>
                    <li>JSpang</li>
                </ul>
            </div>
        );
    }
}

// 3 定义映射关系函数，将store对象中的state映射为组件TodoList中的props属性
const stateProps = (state) => {
    // console.log(state);   这里传入的state就是store仓库中的state
    return {inputValue: state.inputValue};
}

// 2 改变暴露的组件，将暴露的内容改为connect连接器
export default connect(
    stateProps,
    null)(TodoList);
```

## 3 改变 store 对象中数据

- 改变 input 表单项的内容时，改变 store 对象中数据
- 这需要使用 onChange 事件监听

```
// 这样写可以发现input表单项显示的内容始终没有变化
<input value={inputValue} onChange={this.inputChange}/>
inputChange = (e) => {
    // 但是打印可以显示
    console.log(e.target.value)
}
```

     (1) 先编写connect连接器的第二个参数：映射关系函数2，将它所返回的函数inputChange直接传递到TodoList组件的props属性中
     (2) 修改connect连接器
     (3) 将TodoList组件中使用该函数的直接用this.props.inputChange替换

```
import React, { Component } from 'react';
import {connect} from 'react-redux'

import store from './store/index'

class TodoList extends Component {
    render() {
        // 3 在该组件中使用state中的属性的地方进行修改，直接从props中取值即可
        const {inputValue, inputChange} = this.props;
        return (
            <div>
                <div>
                    <input value={inputValue} onChange={inputChange}/>
                    <button>提交</button>
                </div>
                <ul>
                    <li>JSpang</li>
                </ul>
            </div>
        );
    }
}

const stateProps = (state) => {
    // console.log(state);   这里传入的state就是store仓库中的state
    return {inputValue: state.inputValue};
}

// 1 先编写connect连接器的第二个参数：映射关系函数2，将它所返回的函数inputChange直接传递到TodoList组件的props属性中
const dispatchToProps = (dispatch) => {
    return {
        inputChange(e){
            console.log(e.target.value)
        }
    }
}

// 2 修改connect连接器
export default connect(
    stateProps,
    dispatchToProps)(TodoList);
```

## 4 派发 action 到 store 中

- 修改映射关系函数 2：

```
// 修改映射关系函数2
const dispatchToProps = (dispatch) => {
    return {
        inputChange(e){
            let action = {
                type: 'change_input',
                value: e.target.value
            }
            dispatch(action);
        }
    }
}
```

- 在 reducer 中编写对应的业务逻辑
  - 可以发现第二个映射关系就是：根据表单项的输入修改 state 的值
  - state 的值改变了--->表单项的显示内容就改变了(第一个映射关系),表单项输入改变了--->state 就变了(第二个映射关系)

```
export default (state=initState, action) =>{
    if(action.type === 'change_input'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    return state;
}
```

- 给 button 添加 onClick 事件监听，点击按钮后，添加事件到列表中

```
<button onClick={addItems}>提交</button>
```

- 派发 action

```
// 修改映射关系函数2
const dispatchToProps = (dispatch) => {
    return {
        inputChange(e){
            let action = {
                type: 'change_input',
                value: e.target.value
            }
            dispatch(action);
        },
        addItems(){
            // 这里不传入值，因为要添加的值就是新state的inputValue属性
            let action = {
                type: 'add_items'
            }
            dispatch(action);
        }
    }
}
```

- 修改 reducer

```
export default (state=initState, action) =>{
    if(action.type === 'change_input'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if(action.type === 'add_items'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }
    return state;
}
```

- 修改映射函数 1，将 store 对象中的 state 的 list 属性传递给 TodoList 组件

```
const stateProps = (state) => {
    // console.log(state);   这里传入的state就是store仓库中的state
    return {
        inputValue: state.inputValue,
        // 将store对象中的state的list属性传递给TodoList组件
        list: state.list
    };
}
```

- 在 TodoList 组件中重新定义 list 组件：

```
<ul>
    {
        list.map((item,index) => {
            return (
                <li key={index}>{item}</li>
            )
        })
    }
</ul>
```

- 最后我们将 todoList.js 中的类组件 TodoList 修改为无状态函数组件,得到下面的结果：
  - 可以发现：connect 的作用是把 UI 组件（无状态组件）和业务逻辑代码的分开，然后通过 connect 再链接到一起，让代码更加清晰和易于维护。这也是 React-Redux 最大的有点。

```
import React from 'react';
import {connect} from 'react-redux'

// 1 UI组件(无状态组件)
const TodoList = (props) =>{
        // 4 在该组件中使用state中的属性的地方进行修改，直接从props中取值即可
    const {inputValue, inputChange,onClick,list,deleteItems} = props;
    return (
        <div>
            <div>
                <input value={inputValue} onChange={inputChange}/>
                <button onClick={onClick}>提交</button>
            </div>
            <ul>
                {
                    list.map((item,index) => {
                        return (
                            <li key={index}>{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

// 2 业务逻辑代码
const stateProps = (state) => {
    // console.log(state);   这里传入的state就是store仓库中的state
    return {
        inputValue: state.inputValue,
        list: state.list
    };
}

const dispatchToProps = (dispatch) => {
    return {
        inputChange(e){
            let action = {
                type: 'change_input',
                value: e.target.value
            }
            dispatch(action);
        },
        onClick(){
            let action = {
                type: 'add_items'
            }
            dispatch(action);
        }
    }
}

// 3 connect连接器
export default connect(
    stateProps,
    dispatchToProps)(TodoList);
```

