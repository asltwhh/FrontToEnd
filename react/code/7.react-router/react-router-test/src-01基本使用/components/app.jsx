import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'

import Home from './home'
import About from './about'
import Dashboard from './dashboard'

export default class App extends React.Component{
    render(){
        return (
            <Router>
                <div>
                <ul>
                    <li><Link to='/'>首页</Link></li>
                    <li><Link to='/about'>关于</Link></li>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                </ul>
                <hr/>

                <Switch>
                {/* 如果第一个路由路径的url为/则一定要加exact,否则所有的link均会匹配第一个路由 */}
                    <Route exact path='/' ><Home /></Route>
                    <Route path='/about'><About /></Route>
                    <Route path='/dashboard'><Dashboard /></Route>
                </Switch>
                
                </div>
            </Router>
        )
    }
}