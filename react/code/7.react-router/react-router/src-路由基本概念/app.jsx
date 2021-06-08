import React from "react";
import {
  HashRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";

import Home from './components/home/home'
import News from './components/news/news'
import Profile from './components/profile/profile'
import MenuLink from './components/Menulink/MenuLink'
import './css/index.css'


export default class App extends React.Component{
    render(){
        return (
            <Router>
            {/* 规定：必须放置在路由器中 */}
                <div>
                    <h1>react路由</h1>

                    <hr/>

                    {/* 1 使用Route定义映射关系，即路由表，哪一个路径该显示哪一个组件 */}
                    {/* Route有两个属性：path表示要跳转的路径， component表示跳转以后要显示的组件 */}
                    <Route path='/home' component={Home} />
                    <Route path='/news' component={News} />
                    <Route path='/profile' component={Profile} />
                    
                    {/* 2 声明式路由 */}
                    {/* 方法1：使用Link标签，link标签的地址与Route标签的地址相对应，这样就可以保证点击Link之后路由显示响应的组件 */}
                    <Link to='/home'>首页</Link><br/>
                    <Link to='/news'>新闻</Link><br/>
                    <Link to='/profile'>个人</Link><br/>


                    <hr />
                    {/* 2 方法2：使用NavLink组件替换Link组件，当选中某项时实现该选项的高亮 
                    */}
                    {/* 如果需要高亮某个链接，则就需要使用Navlink
                        activeClassName是react-router-dom提供的，属性的名称(即类名)自己定义，
                        样式需要自己去写，写一个css样式然后引入到当前文件夹下即可
                     */}
                     
                     <h2>使用NavLink组件</h2>
                    <NavLink to='/home' activeClassName='selected'>首页</NavLink><br/>
                    <NavLink to='/news' activeClassName='selected'>新闻</NavLink><br/>
                    <NavLink to='/profile' activeClassName='selected'>个人</NavLink><br/>
                    

                    <hr/>
                    {/* 3 学习children属性 */}
                    {/* children：无论url的地址里面的hash是否和hash匹配得上，Children组件都会被渲染 */}
                    {/* 特性2：children函数式组件接收一个参数props, 如果匹配成功，则props里面的
                    match属性就是一个对象，对象里面包含了地址相关的信息
                    反之，值为null,但是组件仍会被渲染 */}
                    
                    <Route path='/about' children={ (props) => {
                        console.log(props)
                        return (
                            <div>
                                <h2>Children组件</h2>
                            </div>
                        )
                    } } />

                    <hr />
                    {/* 4 方法3：定义一个自己的组件替换NavLink组件，实现被选项的高亮 */}
                     <h2>使用自己封装的MenuLink导航</h2>
                     <MenuLink to='/home' label='首页' /><br />
                     <MenuLink to='/news' label='新闻' /><br />
                     <MenuLink to='/profile' label='个人' /><br />


                     <hr />
                     {/* 5 render函数式组件的渲染 */}
                     <h2>render()函数式组件的渲染</h2>
                     <Route path='/renders' render={ (props) => {
                        console.log('render',props)
                        /*
                        函数式组件和类组件均包含props属性
                        打印的props包含：
                            history主要做函数式导航
                            location主要代表的是地址信息
                            match 路由传参可以用
                        */
                        return (
                            <div>
                                <h2>render函数组件的渲染</h2>
                            </div>
                        )
                    } } />
                </div>
            </Router>
        )
    }
}