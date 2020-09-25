import React from 'react'
import ReactDOM from 'react-dom'
import PubSub from 'pubsub-js'

import CommentAdd from '../comment-add/commentAdd'
import CommentList from '../comment-list/commentList'

export default class App extends React.Component{
    constructor(props){
        super();
        this.state = {
            comments:[
                {username:'lily',content:'react太好用了！！！'},
                {username:'Jack',content:'react太难了！！！'}
            ]
        }
    }
    addComment = (comment) =>{
        const comments = this.state.comments;
        comments.unshift(comment);
        this.setState({comments})
    }

    componentDidMount(){
        // 订阅消息，直接执行删除操作
        PubSub.subscribe('deleteComment',(msg,index) => {
            this.deleteComment(index);
        })
    }

    // 添加组件，每次添加组件都会更新界面，所以在更新页面后执行订阅删除
    componentDidUpdate(){
        // 订阅消息，直接执行删除操作
        PubSub.subscribe('addComment',(msg,index) => {
            this.addComment(index);
        })
    }

    deleteComment = (index) =>{
        const comments = this.state.comments;
        comments.splice(index,1);
        this.setState({comments})
    }

    render(){
        const comments = this.state.comments;
        return (
            <div>
                <header className="site-header jumbotron">
                    <div className="container">
                        <div className="row">
                        <div className="col-xs-12">
                            <h1>请发表对React的评论</h1>
                        </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <CommentAdd />
                    <CommentList comments={comments} />
                </div>
            </div>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('root'));