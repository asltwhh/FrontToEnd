import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import CommentAdd from '../../components/comment-add/commentAdd'
import CommentList from '../../components/comment-list/commentList'
import {addComment, deleteComment} from '../../redux/actions'

class App extends React.Component{

    static propTypes = {
        comments: PropTypes.array.isRequired,
        addComment: PropTypes.func.isRequired,
        deleteComment: PropTypes.func.isRequired
    }
    // react实现异步操作
    componentDidMount() {
        // 模拟异步ajax请求，获取初始化状态的数据
        
    }
    
    render(){
        const {comments, addComment, deleteComment} = this.props;
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
                    <CommentAdd addComment={addComment}/>
                    <CommentList comments={comments} deleteComment={deleteComment}/>
                </div>
            </div>
        )
    }
}

export default connect(
    // 这里直接将state设定为是comments,即它是一个数组类型
    (state) => ({comments: state}),
    {addComment: addComment, deleteComment: deleteComment}  
)(App);