import React from 'react'
import {Input,List,Button} from 'antd'

const Item = List.Item;
export default class TodoListUI extends React.Component{

    render(){
        const {inputValue,list,handleChange,addItem,deleteItem} = this.props;
        return (
            <div>
                <Input placeholder='write something' value={inputValue} 
                style={{width:'250px',marginRight:'10px'}} 
                onChange={handleChange}></Input>
                <Button type='primary' onClick={addItem}>增加</Button>
                {/* bordered展示边框  dataSource:列表数据源[] 
                 renderItem:当使用 dataSource 时，可以用 renderItem 自定义渲染列表项
                 */}
                <List 
                    bordered 
                    dataSource={list} 
                    // onClick={this.deleteItem.bind(this,index)}
                    renderItem={(item,index) =>(<Item onClick={() => {deleteItem(index)}}>{item}</Item>)}
                />
            </div>
        )
    }
}