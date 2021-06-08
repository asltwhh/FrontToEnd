/**
 * 上部的搜索模块
 */
import React, {Component} from 'react'
import PubSub from 'pubsub-js'
 
class Search extends Component {
 
  search = () => {
    var searchName = this.nameInput.value

    // 发布消息
    PubSub.publish('search',searchName);
  }
 
  render() {
    return (
      <div>
        <input type="text" placeholder="enter the name you search"
               ref={(input => this.nameInput = input)}/>
        <button onClick={this.search}>Search</button>
      </div>
    )
  }
}
 
export default Search