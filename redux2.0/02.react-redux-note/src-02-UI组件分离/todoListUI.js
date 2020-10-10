import React from 'react';


export default function TodoListUI(props){
    const {list,inputValue,inputChange,addItems,deleteItems} = props;
    return ( 
        <div>
            <div>
                <input value={inputValue} onChange={inputChange}/>
                <button onClick={addItems}>提交</button>
            </div>
            <ul>
                {
                    list.map((item,index) => {
                        return (
                            <li onSelect={() => (deleteItems(index))}>{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}