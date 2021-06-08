function mineReadFile(path){
    return new Promise((resolve,reject)=>{
        // 读取文件
        require('fs').readFile(path,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        })
    })
}

mineReadFile('./bkpp.txt')   // 返回一个promise对象
.then((data)=>{
    console.log(data.toString());
},(reason)=>{
    console.log(reason)
})