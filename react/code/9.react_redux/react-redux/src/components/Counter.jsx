import React from 'react'
import PropTypes from 'prop-types'


export default class Counter extends React.Component{

    static proptypes = {
        number: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired
    }

    increment = () => {
        const number = this.select.value*1;
        this.props.increment(number);
    }

    decrement = () => {
        const number = this.select.value*1;
        this.props.decrement(number);
    }

    incrementIfOdd = () => {
        const number = this.select.value*1;
        if( this.props.number%2 === 1 ){
            this.props.increment(number);
        }
    }

    incrementAsync = () => {
        const number = this.select.value*1;
        setTimeout(() => {
            this.props.increment(number);
         }, 1000)   
    }

    render(){
        const {number} = this.props;
        return (
            <div>
                <p>add {number} times</p>
                <div>
                    <select ref={select => this.select=select}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                    <button onClick={this.incrementIfOdd}>add if odd</button>&nbsp;&nbsp;
                    <button onClick={this.incrementAsync}>addAsync</button>&nbsp;&nbsp;
                </div>
            </div>
        )
    }
}