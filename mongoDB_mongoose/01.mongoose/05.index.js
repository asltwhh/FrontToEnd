require('./tools/connect_mongo');
var StuModel = require('./models/student');

console.log(StuModel);

StuModel.find({name:"霸波奔"},function(err,docs){
    if(!err){
        console.log(docs)
    }
})