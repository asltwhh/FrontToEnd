// 连接数据库
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongoose_test", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open",function(){
    console.log("数据库连接成功...");
})

// 创建Schema模式对象
var Schema = mongoose.Schema;

// 创建Schema(模式)对象
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

// 通过Schema创建model,model就是数据库中的collection,通过model才可以对数据库进行操作
// mongoose.model(modelName,schema); 
// modelName就是在数据库中映射的集合,schema就是其对应的约束
var StuModel = mongoose.model('student',stuSchema);

// Model的方法
/*
有了Model就可以对数据库进行增删改查的操作了
    Model.create(doc(s), [callback])：创建一个文档，并且添加到数据库中
        可以是一个文档，也可以是多个文档组成的数组
        callback是可选的 当操作完成以后调用的回调函数
*/

// StuModel.create([
//     {
//         name: '沙和尚',
//         age:38,
//         gender: 'male',
//         address: '流沙河'
//     }
// ],function(err){
//     if(!err){
//         console.log(arguments);
//         // arguments是一个数组，
//         // [null, 插入的文档]
//         /* 
//         [Arguments] {
//             '0': null,
//             '1': [
//                 {
//                 gender: 'male',
//                 _id: 5f7a823f34739677fc345e30,
//                 name: '沙和尚',
//                 age: 38,
//                 address: '流沙河',
//                 __v: 0
//                 }
//             ]
//         }
//         */
//     }
// })

// StuModel.find({}, 'name age -_id' , function(error,docs){
//     // 传入'name age'表示只显示doc的name和age属性
//     if(!error){
//         console.log(docs instanceof StuModel);
//     }
// })

// StuModel.updateOne({name:'唐僧'},{$set:{age:21}},function(error, res){
//     if(!error){
//         console.log('修改成功');
//         console.log(res);
//         // res是一个对象，表示修改操作的数量： { ok: 1, nModified: 1, n: 1 }
//     }
// })

// StuModel.replaceOne({name:'孙悟空'},{name:'蜘蛛精'},function(error, res){
//     if(!error){
//         console.log('修改成功');
//         console.log(res);
//         // res是一个对象，表示修改操作的数量： { ok: 1, nModified: 1, n: 1 }
//     }
// })

// StuModel.deleteMany({name:'沙和尚'},function(error, res){
//     if(!error){
//         console.log('修改成功');
//         console.log(res);
//         // { ok: 1, n: 1, deletedCount: 1 }
//         // { ok: 1, n: 3, deletedCount: 3 }
//     }
// })

StuModel.estimatedDocumentCount({name:'沙和尚'},function(error, count){
    if(!error){
        console.log('修改成功');
        console.log(count);
    }
})