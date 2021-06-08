const fs = require('fs');

// 不适用promise的形式
// fs.readFile('bkpp.txt',(err,data)=>{
//     if(err){
//         throw err;
//     }
//     console.log(data);
// })

// Promise形式    
  
let p = new Promise((resolve,reject)=>{
    fs.readFile('bkp.txt',(err,data)=>{
        if(err){  
                   reject(err);
        }
        resolve(data);
    })
})
p.then((data)=>{
    console.log(data.toString());
},(reason)=>{
    console.log(reason)
})