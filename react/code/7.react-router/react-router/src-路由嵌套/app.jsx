import React from "react";
import {
  HashRouter as Router,
  Route,
  NavLink
} from "react-router-dom";

import Home from './components/home/home'
import News from './components/news/news'
import Profile from './components/profile/profile'
import './css/index.css'


export default class App extends React.Component{
    render(){
        return (
            <Router>
            {/* 规定：必须放置在路由器中 */}
                <div>
                    <h1>react路由</h1>

                    <hr />
                    {/* 2 方法2：使用NavLink组件替换Link组件，当选中某项时实现该选项的高亮 
                    */}
                     
                     <h2>使用NavLink组件</h2>
                    <NavLink to='/home' activeClassName='selected'>首页</NavLink><br/>
                    <NavLink to='/news' activeClassName='selected'>新闻</NavLink><br/>
                    <NavLink to='/profile' activeClassName='selected'>个人</NavLink><br/>

                    <hr/>

                    {/* 1 使用Route定义映射关系，即路由表，哪一个路径该显示哪一个组件 */}
                    {/* Route有两个属性：path表示要跳转的路径， component表示跳转以后要显示的组件 */}
                    <Route path='/home' component={Home} />
                    <Route path='/news' component={News} />
                    <Route path='/profile' component={Profile} />
                </div>
            </Router>
        )
    }
}