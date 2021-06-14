import React from 'react'

// 获取store
import store from './store'
import {changeInputAction,addItemAction,deleteItemAction} from './store/action'
import TodoListUI from './todoListUI'

export default class TodoList extends React.Component{

    constructor(props){  
        super(props);
        this.state = store.getState();
        store.subscribe(this.setChange);
    }

    setChange = () => {
        this.setState(store.getState());
    }

    handleChange = (e) => {
        const action = changeInputAction(e.target.value);
        store.dispatch(action);
    }
    addItem = () => {
        const action = addItemAction();
        store.dispatch(action);
    }
    deleteItem = (index) => {
        const action = deleteItemAction(index);
        store.dispatch(action);
    }

    render(){
        return (
            <div>
                <TodoListUI 
                    inputValue={this.state.inputValue}
                    list={this.state.list}
                    handleChange={this.handleChange}
                    addItem={this.addItem}
                    deleteItem={this.deleteItem}
                ></TodoListUI>
            </div>
        )
    }
}