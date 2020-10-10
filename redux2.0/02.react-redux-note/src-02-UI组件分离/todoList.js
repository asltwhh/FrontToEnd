import React,{Component} from 'react';
import {connect} from 'react-redux'
import {changeInputAction,addItemAction,deleteItemAction} from './store/action'

import TodoListUI from './todoListUI'


class TodoList extends Component{
        // 4 在该组件中使用state中的属性的地方进行修改，直接从props中取值即可

    inputChange = (e) => {
        this.props.changeInputAction(e.target.value);
    }
    addItems = () => {
        this.props.addItemAction();
    }
    deleteItems = (index) => {
        console.log('我点中啦')
        this.props.deleteItemAction(index);
    }
    
    render(){
        const {list,inputValue} = this.props;
        return ( 
            <div>
                <TodoListUI 
                    list={list}
                    inputValue = {inputValue}
                    inputChange = {this.inputChange}
                    addItems = {this.addItems}
                    deleteItems = {this.deleteItems}
                ></TodoListUI>
            </div>
        );
    }
}

// 3 定义映射关系函数1，将store对象中的state映射为组件TodoList中的props属性
const stateProps = (state) => {
    // console.log(state);   这里传入的state就是store仓库中的state
    return {
        inputValue: state.inputValue,
        list: state.list
    };
}

// 2 改变暴露的组件，将暴露的内容改为connect连接器
/* 
connect第一个参数以函数的形式将store中的state传递给组件的props
connect第二个参数
    做法1： 以对象的形式将产生action对象的方法传递给组件的props,不同显式dispatch了
    做法2： 以函数的形式将产生action对象并且dispath的方法传递给props,dispatch是出现在代码中的
*/
export default connect(
    state =>( {inputValue: state.inputValue,list: state.list}),
    {changeInputAction,addItemAction,deleteItemAction}
)(TodoList);