import { INCREMENT, DECREMENT } from "./action-type";

export const incrementCreator = number => ({type:INCREMENT, data:number});
export const decrementCreator = number => ({type:DECREMENT, data:number});

export const incrementAsyncCreator = number => {
    return (
        (dispatch) => {
            setTimeout( ()=>{
                dispatch(incrementCreator(number))
            }, 1000 );
        }
    )
}