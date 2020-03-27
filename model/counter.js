var mongoose = require("mongoose")
var Schema = mongoose.Schema 
let counter ={
    _id:{
        type:String,
        unique:true
    },
    seq:{
        type:Number
    }
}
var counterSchema = Schema(counter, {versionKey: false})
var Counter = mongoose.model('Counter',counterSchema);
module.exports = Counter