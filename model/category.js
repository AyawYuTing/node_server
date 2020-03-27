var mongoose = require("mongoose")
var Schema = mongoose.Schema 
let category = {
    id:{
        type:String,
        unique:true
    },
    name:{
        type:String,
    },
    type:{
        type:String
    }

}
var categorySchema = Schema(category, {versionKey: false})
var Category = mongoose.model('Category',categorySchema);
module.exports = Category