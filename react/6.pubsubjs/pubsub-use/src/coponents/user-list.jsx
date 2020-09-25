/**
 * 下部的用户列表模块
 */
import React from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'
 
class UserList extends React.Component {

  state = {
    firstView: true,
    loading: false,
    users: null,
    errorMsg: null
  }

  componentDidMount(){
    // 这里之所以使用didMount是因为user-list的内容每一次修改searchName,就会新插入一个虚拟DOM，而不是更新DOM
    // 订阅消息
    PubSub.subscribe('search',(msg,searchName) => {
      // 此时就将状态从最初转为loading中
      this.setState({firstView:false, loading:true});

      // 发送请求
      const url = `https://api.github.com/search/users?q=${searchName}`;
      axios.get(url)
        .then((response) => {
          console.log(response)
          // 得到响应报文之后，修改状态值，从而显示响应结果
          this.setState({ loading: false, users: response.data.items })
        })
        .catch((error)=>{
          // 如果响应出错，则修改状态值，显示错误信息
          console.log('error', error.message)
          this.setState({ loading: false, error: error.message })
        })
      })
  }

  // render返回的是组件
  render () {
    const {firstView,loading,users,errorMsg} = this.state;
    if (firstView) {
      return <h2>请输入关键词进行搜索！</h2>
    } else if (loading) {
      return <h2>正在loading中...</h2>
    } else if (errorMsg) {
      return <h2>糟糕，遇到{errorMsg}了！</h2>
    } else {
      return (
        <div className="row">
          {
            // 注意这里一定要是html_url,avatar_url以及login,因为这是响应报文中的信息
              // 需要对应起来
            users.map((user,index) => (
              
              <div className="card" key={index}>
                <a href={user.html_url} target="_blank">
                  <img src={user.avatar_url} style={{width: '100px'}} alt='user'/>
                </a>
                <p className="card-text">{user.login}</p>
              </div>
            ))
          }
        </div>
      )
    }
  }
}
 
export default UserList