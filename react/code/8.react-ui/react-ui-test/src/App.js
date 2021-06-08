import React from 'react';
import './App.css';
import {Button, Toast} from 'antd-mobile'
// import Button from '../node_modules/antd-mobile/lib/button'
// import Toast from '../node_modules/antd-mobile/lib/toast'

class App extends React.Component {
  handleClick =()=>{
    Toast.info('提交成功',2);
  }
  render(){
    return (
      <div>
        <Button type='primary' onClick={this.handleClick}>提交</Button>
      </div>
    );
  }
}

export default App;
