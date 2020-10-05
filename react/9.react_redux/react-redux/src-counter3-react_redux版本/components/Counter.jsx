import React from 'react'
import PropTypes from 'prop-types'

export default class Counter extends React.Component{
    
    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired
    }
    increment = () => {
        // 读取选择框的值   得到的value是一个string,*1将其转为数值类型
        const number = this.select.value*1;
        // 更新状态
        this.props.increment(number);
    }
    decrement = () => {
        // 读取选择框的值   得到的value是一个string,*1将其转为数值类型
        const number = this.select.value*1;
        // 更新状态
        this.props.decrement(number);
    }
    
    incrementIfOdd = () => {
        // 读取选择框的值   得到的value是一个string,*1将其转为数值类型
        const number = this.select.value*1;
        const count = this.props.count;
        // 先判断是否满足条件
        if(count % 2 === 1){
            // 更新状态
            this.props.increment(number);
        }
    }
    
    incrementAsync = () => {
        // 读取选择框的值   得到的value是一个string,*1将其转为数值类型
        const number = this.select.value*1;
        // 启动延时定时器，实现异步操作
        setTimeout( ()=>{
            // 更新状态
            this.props.increment(number);
        },1000);
    }

    render(){
        const count = this.props.count;
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

