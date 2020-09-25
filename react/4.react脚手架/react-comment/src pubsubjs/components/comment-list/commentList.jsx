import React from 'react'

import './commentList.css'
import CommentItem from '../comment-item/commentItem';

export default class CommentList extends React.Component{
    render(){
        const {comments} = this.props;
        // 这里一定要用let ，不能用const,因为这个值需要变化，如果定为const则不会再改变
        let display = comments.length > 0 ? 'none' : 'block';
        return (
            <div className="col-md-8">
                <h3 className="reply">评论回复：</h3>
                <h2 style={{display:display}}>暂无评论，点击左侧添加评论！！！</h2>
                <ul className="list-group">
                    {
                        comments.map((comment,index) => {
                            return <CommentItem comment={comment} key={index}
                                index={index}
                            />
                        })
                    }
                </ul>
            </div>
        )
    }
}  