import React,{Component} from 'react'
import { Link, Route } from 'react-router-dom'

import Detail from './detail'
 
export default class News extends Component{
 
    render(){
        return(
            <div>
                <h2>News 组件</h2>
                <hr/>

                <ul>
                    <li><Link to='/news/details/1/11'>新闻1</Link></li>
                    <li><Link to='/news/details/2/22'>新闻2</Link></li>
                    <li><Link to='/news/details/3/33'>新闻3</Link></li>
                    <li><Link to='/news/details/4/44'>新闻4</Link></li>
                </ul>
                <hr/>
                <h3>新闻的详情-ID-</h3>
                {/* news_id和type会自动添加到组件Detail的match中 */}
                <Route path='/news/details/:news_id/:type' component={Detail} />
                <hr />
            </div>
        )
    }
}