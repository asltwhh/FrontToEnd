import React from 'react'
import PubSub from 'pubsub-js'

export default class CommentAdd extends React.Component{
    state = {
        username:'',
        content:''
    }
    handleName =(e) =>{
        const name = e.target.value;
        this.setState({username:name});
    }
    handleContent =(e) =>{
        const content = e.target.value;
        this.setState({content:content});
    }
    handleClick =() =>{
        const comment = this.state;

        PubSub.publish('addComment',comment);
        
        // this.props.addComment(comment);
        this.setState({
            username:'',
            content:''
        })
    }
    render(){
        return (
            <div className="col-md-4">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label>用户名</label>
                            <input type="text" className="form-control" placeholder="用户名"
                            value={this.state.username} onChange={this.handleName}/>
                        </div>
                        <div className="form-group">
                            <label>评论内容</label>
                            <textarea className="form-control" rows="6" placeholder="评论内容"
                            value={this.state.content} onChange={this.handleContent}></textarea>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" className="btn btn-default pull-right"
                            onClick={this.handleClick}>提交</button>
                            </div>
                        </div>
                    </form>
                </div>
        )
    }
}