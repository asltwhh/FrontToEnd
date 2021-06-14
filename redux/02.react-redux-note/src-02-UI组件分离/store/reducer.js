import {CHANGE_INPUT,ADD_ITEMS,DEL_ITEMS} from './action-type'

const initState = {
    inputValue: 'jspang',
    list: ['我有一头小毛驴，我从来也不骑']
};
export default (state=initState, action) =>{
    if(action.type === CHANGE_INPUT){
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if(action.type === ADD_ITEMS){
        let newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }
    if(action.type === DEL_ITEMS){
        let newState = JSON.parse(JSON.stringify(state)) 
        newState.list.splice(action.index,1)  //删除数组中对应的值
        return newState
    }
    return state;
}