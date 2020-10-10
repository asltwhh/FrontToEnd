import {CHANGE_INPUT,ADD_ITEMS,DEL_ITEMS} from './action-type'

export const changeInputAction = (value)=>({
    type:CHANGE_INPUT,
    value
})

export const addItemAction = ()=>({
    type:ADD_ITEMS
})

export const deleteItemAction = (index)=>({
    type:DEL_ITEMS,
    index
})

