// 连接数据库
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongoose_test", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open",function(){
    console.log("数据库连接成功...");
})

// 创建Schema模式对象
var Schema = mongoose.Schema;
var stuSchema = new Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        // 这个写法可以指定默认值
        default: 'female'
    },
    address: String
});
// 创建Model对象
var StuModel = mongoose.model('student',stuSchema);

// 创建一个Document
// var stu = new StuModel({
//     name:'霸波奔',
//     age: 48,
//     gender: 'male',
//     address: '碧波潭'
// })
// console.log(stu)
/*
{
  gender: 'male',
  _id: 5f7aaaca76ae556494de00f2,   此时发现_id属性就存在了，但是此时并没有插入数据库
  name: '霸波奔',
  age: 48,
  address: '碧波潭'
}
*/

// 将文档插入数据库的集合中
// document.save([options],[callback])
// stu.save(function(err){
//     if(!err){
//         console.log("保存成功...")
//         // 此时Document对象stu就插入到了数据库mongoose_test的集合students中了
//     }
// })


StuModel.findOne({},function(err,doc){
    if(!err){
        console.log(doc)
        // 此时Document对象stu就插入到了数据库mongoose_test的集合students中了
        // doc.updateOne({$set:{age:16}}, function(error,res){
        //     if(!error){
        //         console.log("修改成功....");
        //         console.log(res)
        //         // { ok: 1, nModified: 1, n: 1 }
        //     }
        // })

        var j = doc.toJSON();
        console.log(j);
    }
})

