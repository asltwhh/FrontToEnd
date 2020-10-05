import React from 'react'
export default class App extends React.Component{
    state = {
        count: 0
    }

    increment = () => {
        // 读取选择框的值   得到的value是一个string,*1将其转为数值类型
        const number = this.select.value*1;
        // 获取原状态值
        const count = this.state.count ;
        // 更新状态
        this.setState({count:count+number})
    }
    decrement = () => {
        // 读取选择框的值   得到的value是一个string,*1将其转为数值类型
        const number = this.select.value*1;
        // 获取原状态值
        const count = this.state.count;
        // 更新状态
        this.setState({count:count-number})
    }
    
    incrementIfOdd = () => {
        // 读取选择框的值   得到的value是一个string,*1将其转为数值类型
        const number = this.select.value*1;
        const count = this.state.count;
        // 先判断是否满足条件
        if(count % 2 === 1){
            // 更新状态
            this.setState({count:(count + number)})
        }
    }
    
    incrementAsync = () => {
        // 读取选择框的值   得到的value是一个string,*1将其转为数值类型
        const number = this.select.value*1;
        // 获取原有状态值
        const count = this.state.count;

        // 启动延时定时器，实现异步操作
        setTimeout( ()=>{
            // 更新状态
            this.setState({count:count+number})
        },1000);
    }

    render(){
        const {count} = this.state;
        return (
            <div>
                <p>click {count} times</p>
                {/* 使用非受控组件的方法，将select标签作为参数传递给App对象 */}
                <select ref={select => this.select=select }>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
                <button onClick={this.incrementAsync}>increment async</button>&nbsp;&nbsp;
            </div>
        )
    }
}