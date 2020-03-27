var mongoose = require("mongoose")
var url = "mongodb://localhost:27017/test";
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(url,{ useNewUrlParser: true },function(err,db){
    console.log(err);
})

var db = mongoose.connection;
db.on("error",console.error.bind(console,'连接失败：'))
db.once('open',function(){
    console.log('连接数据库'+url+'成功！')
});

var Schema = mongoose.Schema //schema 都会映射到一个 MongoDB collection

var User = require('./model/user')
var Counter = require('./model/counter')
var Category = require('./model/category')


module.exports = { User,Category,Counter }