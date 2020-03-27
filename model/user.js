var mongoose = require("mongoose")
var Schema = mongoose.Schema 
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
var userSchema = Schema(user, {versionKey: false})
var User = mongoose.model('User',userSchema);//将schema编译为model构造函数
module.exports = User