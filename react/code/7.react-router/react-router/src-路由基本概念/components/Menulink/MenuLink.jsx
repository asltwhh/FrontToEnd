// 这个组件模拟NavLink的实现
// 功能：返回一个导航Link,直接使用函数式组件即可，不需要状态

import React from 'react'
import { Route, Link } from 'react-router-dom'

export default function MenuLink({to, label}){
    // 此组件传入两个参数：to和label
    return (
        // 返回一个route组件，通过检测match是否为空，为空，则说明此时url部分展示的不是此组件，否则就是此组件，
        // 从而为Link组件添加css样式
        <Route path={to} children={ ({match})=>{
            return <Link className={match ? 'active' : ''} to={to}>{label}</Link>
        }} />
    )
}