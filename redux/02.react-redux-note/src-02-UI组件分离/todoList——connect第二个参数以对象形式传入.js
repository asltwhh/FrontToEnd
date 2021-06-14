import React,{Component} from 'react';
import {connect} from 'react-redux'
import {changeInputAction,addItemAction,deleteItemAction} from './store/action'


class TodoList extends Component{
        // 4 在该组件中使用state中的属性的地方进行修改，直接从props中取值即可

    inputChange = (e) => {
        this.props.changeInputAction(e.target.value);
    }
    addItems = () => {
        this.props.addItemAction();
    }
    deleteItems = (index) => {
        this.props.deleteItemAction(index);
    }
    
    render(){
        const {list,inputValue} = this.props;
        return ( 
            <div>
                <div>
                    <input value={inputValue} onChange={this.inputChange}/>
                    <button onClick={this.addItems}>提交</button>
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
}

// 3 定义映射关系函数1，将store对象中的state映射为组件TodoList中的props属性
const stateProps = (state) => {
    // console.log(state);   这里传入的state就是store仓库中的state
    return {
        inputValue: state.inputValue,
        list: state.list
    };
}

// 定义映射关系函数2
/* const dispatchToProps = (dispatch) => {
    return {
        inputChange(e){
            const action = changeInputAction(e.target.value)
            dispatch(action);
        },
        addItems(){
            const action = addItemAction()
            dispatch(action);
        },
        deleteItems(index){
            const action = deleteItemAction(index)
            dispatch(action);
        }
    }
} */

// 2 改变暴露的组件，将暴露的内容改为connect连接器
export default connect(
    state =>( {inputValue: state.inputValue,list: state.list}),
    {changeInputAction,addItemAction,deleteItemAction}
)(TodoList);