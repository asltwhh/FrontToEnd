import React from 'react'
export default class CommentItem extends React.Component{

    handleClick =() =>{
        const {comment,index,deleteComment} = this.props;
        if(window.confirm('确定删除'+comment.username+'的评论吗？')){
            deleteComment(index);
        }
    }
    render(){
        const {comment,index,deleteComment} = this.props;
        return (
            <li className="list-group-item">
                    <div className="handle">
                    <a href="javascript:;" onClick={this.handleClick}>删除</a>
                    </div>
                    <p className="user"><span >{comment.username}</span><span>说:</span></p>
                    <p className="centence">{comment.content}</p>  
            </li>
        )
    }
}