import React from 'react'
import {Link, Route} from 'react-router-dom'
import MessageDetail from "./message-detail"

export default class Message extends React.Component {
  state = {
    messages: []
  }

  componentDidMount () {
    // 模拟发送ajax请求
    setTimeout(() => {
      const data = [
        {id: 1, title: 'Message001'},
        {id: 3, title: 'Message003'},
        {id: 6, title: 'Message006'},
      ]
      this.setState({
        messages: data
      })
    }, 1000)
  }

  showDetail = (id) => {
    this.props.history.push(`/home/message/message_detail/${id}`);
  }

  showDetail2 = (id) => {
    this.props.history.replace(`/home/message/message_detail/${id}`);
  }

  back=() =>{
    this.props.history.goBack();
  }
  next =() => {
    this.props.history.goForward();
  }
  reqPage =() =>{
    window.location='http://baidu.com';
  }
  render () {
    return (
      <div>
        <ul>
          {
            this.state.messages.map((m, index) => {
              return (
                <li key={index}>
                {/* 直接用a标签则是非路由链接，点击之后会发送get请求
                    直接用Link则是路由标签
                 */}
                 {/* 非路由标签：会发送get请求 */}
                  {/* <a href={`/home/message/message_detail/${m.id}`}>{m.title}</a> */}
                 
                 {/* 路由标签：不发送get请求 */}
                  <Link to={`/home/message/message_detail/${m.id}`}>{m.title}</Link>
                  {/* 使用下面的click事件之后会修改当前的url,从而在route中寻找相对应的path,加载对应的组件 */}
                  &nbsp;&nbsp;<button onClick={() => this.showDetail(m.id)}>push查看</button>
                  &nbsp;&nbsp;<button onClick={() => this.showDetail2(m.id)}>replace查看</button>
                </li>
              )
            })
          }
        </ul>
        <p>
          <button onClick={this.back}>回退</button>&nbsp;&nbsp;
          <button onClick={this.next}>前进</button>
        </p>
        {/* 通过js进行页面跳转 */}
        <p>
          <button onClick={this.reqPage}>页面跳转</button>
        </p>
        <hr/>

        <Route path={`/home/message/message_detail/:id`} component={MessageDetail}></Route>
      </div>
    )
  }
}