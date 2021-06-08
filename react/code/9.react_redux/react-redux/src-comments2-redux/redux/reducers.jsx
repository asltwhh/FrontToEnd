// 根据老的state和action返回一个新的state

import { ADD_COMMENT, DELETE_COMMENT } from "./action-types"

const initComments = [
    {username:'lily',content:'react太好用了！！！'},
    {username:'Jack',content:'react太难了！！！'}
]
export function comments(state=initComments, action) {
    switch (action.type) {
        case ADD_COMMENT:
            // 直接将新的comment添加到comments数组的第一位
            return [action.data, ...state]
        case DELETE_COMMENT:
            // 将index=action.data的元素删除
            // filter不会改变数组本身，会产生一个新的数组，这比较符合状态操作
            return state.filter( (comment, index) => (index!==action.data) );
        default:
            return state;
    }
}