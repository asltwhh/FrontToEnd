import React from 'react'
export default class Home extends React.Component{
    render(){
        console.log('类组件', this.props);
        return (
            <div>
                <h2>Home组件</h2>
            </div>
        )
    }
}