import React from 'react'
import PubSub from 'pubsub-js'

export default class CommentItem extends React.Component{

    handleClick =() =>{
        const {comment,index} = this.props;
        if(window.confirm('确定删除'+comment.username+'的评论吗？')){
            // 发布事件
            PubSub.publish('deleteComment',index);
        }
    }
    render(){
        const {comment,index} = this.props;
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