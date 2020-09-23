import React from 'react'
import ReactDOM from 'react-dom'

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