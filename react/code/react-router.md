# react-router

## 1 使用步骤

```
1 安装react-router-dom：npm install react-router-dom --save
2 创建一个react-app: create-react-app app名称
3 在组件文件中引入相应的包
    import React from "react";
    import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
    } from "react-router-dom";
4 确定路由器中的路由路线并且匹配对应的Link组件：
    export default function App() {
    return (
        <Router>
        <div>
        {/* 2 每一个link通过to属性匹配一个Route路线，Link在页面中会形成一个a标签，
        每点击一个link,都会随之在路由器中渲染一个与其路径匹配的组件 */}
            <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/topics">Topics</Link>
            </li>
            </ul>

            {/* 1 先确定路由器中的路由线路 */}
            <Switch>
                {/* 每一个Route组件的path属性指定路由路径，内容指定路由到该路径后显示的组件
                    这里的About,Home,Topic都是其他的函数组件
                 */}
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/topics">
                    <Topics />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
        </Router>
    );
    }
```