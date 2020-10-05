import React from 'react'
import {connect} from 'react-redux'

import {incrementCreator,decrementCreator, incrementAsyncCreator} from '../redux/actions'
import Counter from '../components/Counter'

// 向外暴露Counter组件的包装组件
export default connect(
    (state) => (
        {count:state}
    ),
    {increment: incrementCreator, decrement: decrementCreator, incrementAsync: incrementAsyncCreator}
)(Counter)