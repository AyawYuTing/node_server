var mongoose = require("mongoose")
var url = "mongodb://localhost:27017/test";
mongoose.set('useCreateIndex', true)
mongoose.connect(url,{ useNewUrlParser: true },function(err,db){
    console.log(err);
})

var db = mongoose.connection;
db.on("error",console.error.bind(console,'连接失败：'))
db.once('open',function(){
    console.log('连接数据库'+url+'成功！')
});

var Schema = mongoose.Schema //schema 都会映射到一个 MongoDB collection

// 用户
let user ={
    name:{
        type:String,
        unique:true
    },
    psw:{
        type:String,
        set(val){
            // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
            return require('bcryptjs').hashSync(val,10)
        }
    }
}
var userSchema = Schema(user)
var User = mongoose.model('User',userSchema);//将schema编译为model构造函数
// var newUser = new User({name:'Ayaw'})//Mongoose会自动找到名称是model名字复数形式的collection
// newUser.save()

module.exports = {User}