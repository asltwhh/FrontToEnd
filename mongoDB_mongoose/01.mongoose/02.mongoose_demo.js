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

// 向数据库的集合中插入文档
// StuModel.create(doc,function(error){})
StuModel.create({
    name:'孙悟空',
    age: 18,
    gender: 'male',
    address: "花果山"
},function(err){
    if(!err){
        console.log('插入成功...');
    }
})

// 此时执行代码后，更新数据库可以发现该数据库就存在了，因为此时插入了最小的数据库单位：document
// 可以发现此时它所创建的集合名为students,上面我们指定的是student,这是因为mongoose会自动将集合名变成小写及复数



