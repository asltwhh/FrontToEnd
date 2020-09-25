import React from 'react'
export default class Detail extends React.Component{
    render(){
        return (
            <div>
                <h2>新闻的详情展示</h2>
                {/* news_id,type这些参数是在news.jsx中定义的 */}
                <p>ID:{this.props.match.params.news_id}-Type:{this.props.match.params.type}</p>
            </div>
        )
    }
}