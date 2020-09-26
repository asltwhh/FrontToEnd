import React from 'react'
export default class Detail extends React.Component{

    handleClick = () => {
      // 使用编程式的导航实现跳转，用户点击后跳转
      // push:传入一个对象，参数1表示要跳转的路径，参数2表示跳转时可以携带的路由参数(可选)
      // state以及info这些名称均是自己定义的
      this.props.history.push({pathname:'/home', state:{info:"从"+this.props.location.pathname+"过来的"}});
    }
    render(){
        return (
            <div>
                <h2>新闻的详情展示</h2>
                {/* news_id,type这些参数是在news.jsx中定义的 */}
                <p>ID:{this.props.match.params.news_id}-Type:{this.props.match.params.type}</p>
                <hr />
                <button onClick={this.handleClick}>点击回到首页</button>
            </div>
        )
    }
}