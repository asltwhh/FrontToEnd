import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'

import Child from './child'

export default class App extends React.Component{
    render(){
        return (
            <Router>
                <div>
                    <h2>Accounts</h2>

                    <ul>
                        <li><Link to='/netflix'>Netflix</Link></li>
                        <li><Link to='/zillow group'>Zillow Group</Link></li>
                        <li><Link to='/yahoo'>Yahoo</Link></li>
                        <li><Link to='/modus-create'>Modus Create</Link></li>
                    </ul>
                    <hr/>

                    <Switch>
                    {/* 如果第一个路由路径的url为/则一定要加exact,否则所有的link均会匹配第一个路由 */}
                        <Route path="/:id" children={<Child />}></Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}