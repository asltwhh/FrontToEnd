import React from "react";
import { Input, List, Button } from "antd";

// 获取store
import store from "./store";

const Item = List.Item;
export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    // 监听store的变化，如果store变化了就修改对应的元素
    store.subscribe(this.setChange);
  }

  setChange = () => {
    // 修改状态
    this.setState(store.getState());
  };

  handleChange = (e) => {
    console.log(e.target.value);
    const action = {
      type: "changeInput",
      value: e.target.value,
    };
    store.dispatch(action);
  };
  addItem = () => {
    const action = {
      type: "addItem",
    };
    store.dispatch(action);
  };
  deleteItem = (index) => {
    const action = {
      type: "deleteItem",
      index,
    };
    store.dispatch(action);
  };

  render() {
    const { inputValue, list } = this.state;
    return (
      <div>
        <Input
          placeholder="write something"
          value={inputValue}
          style={{ width: "250px", marginRight: "10px" }}
          onChange={this.handleChange}
        ></Input>
        <Button type="primary" onClick={this.addItem}>
          增加
        </Button>
        {/* bordered展示边框  dataSource:列表数据源[] 
                 renderItem:当使用 dataSource 时，可以用 renderItem 自定义渲染列表项
                 */}
        <List
          bordered
          dataSource={list}
          // onClick={this.deleteItem.bind(this,index)}
          renderItem={(item, index) => (
            <Item onClick={() => this.deleteItem(index)}>{item}</Item>
          )}
        />
      </div>
    );
  }
}
