import React,{Component} from 'react'
import {NavLink,Route,Switch,Redirect} from 'react-router-dom'
 
// import News from './home/news'
// import Message from './home/message'
 
export default class Home extends Component{
 
    render(){
        return(
            <div>
                <h1>Home Component</h1>
                {/* <div>
                    <ul className='nav nav-tabs'>
                        <li><NavLink to='/home/news'>News</NavLink></li>
                        <li><NavLink to='/home/message'>Message</NavLink></li>
                    </ul>
                    <div className='panel-body'>
                        <Switch>
                           <Route path='/home/news' component={News}/>
                           <Route path='/home/message' component={Message}/>
                            <Redirect to='/home/message'/>
                        </Switch>
                    </div>
                </div> */}
            </div>
        )
    }
}