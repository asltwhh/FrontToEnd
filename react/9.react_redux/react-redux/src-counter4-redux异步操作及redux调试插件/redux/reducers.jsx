import {INCREMENT,DECREMENT} from './action-type'

export function counter(state=0, action){
    // 这儿在初始化状态时就将其初始化成为一个数值，即它只是一个简单的数值类型的
    switch(action.type){
        case INCREMENT:
            return state+action.data;
        case DECREMENT:
            return state-action.data;
        default:
            return state;
    }
}