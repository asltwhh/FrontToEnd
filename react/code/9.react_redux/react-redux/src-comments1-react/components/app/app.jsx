import React from 'react'
import ReactDOM from 'react-dom'

import CommentAdd from '../comment-add/commentAdd'
import CommentList from '../comment-list/commentList'

export default class App extends React.Component{
    constructor(props){
        super();
        this.state = {
            // comments:[
            //     {username:'lily',content:'react太好用了！！！'},
            //     {username:'Jack',content:'react太难了！！！'}
            // ]
            comments: []
        }
    }

    // react实现异步操作
    componentDidMount() {
        // 模拟异步ajax请求，获取初始化状态的数据
        setTimeout( ()=>{
            const comments = [
                    {username:'lily',content:'react太好用了！！！'},
                    {username:'Jack',content:'react太难了！！！'}
                ]
            this.setState({comments: comments})
        } ,1000)
    }
    addComment = (comment) =>{
        const comments = this.state.comments;
        comments.unshift(comment);
        this.setState({comments})
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
                    <CommentAdd addComment={this.addComment}/>
                    <CommentList comments={comments} deleteComment={this.deleteComment}/>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('root'));