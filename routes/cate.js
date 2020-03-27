var express = require('express');
var { Category,Counter } = require('../mongoose')
var router = express.Router();

function newID(indexName,callback) {
    Counter.findOneAndUpdate({
            _id: indexName
        },{
            $inc: {
                seq: 1
            }
        }, {
            new: true
        },
        function(err, obj) {
            console.log('req',obj.seq)
            callback(obj.seq)
        }
    )
    
}
router.get('/get',function(req,res){
    if(!req.query.type){
        res.json({status:-1,data:null,msg:'type不能为空'})
    }else{
        Category.find({type:req.query.type},function(err,docs){
            if(err){
                res.json({status:-1,data:null,msg:''})
            }else{
                res.json({status:0,data:docs,msg:''})
            }
        })
    }
})
router.post('/add',(req,res) => {
    if(!req.body.name){
        res.json({status:-1,data:null,msg:'分类名称不能为空'})
    }else{
        newID('cateid',function(id){
            let category = new Category({
                id:id,
                name:req.body.name,
                type:req.body.type
            })
            category.save(function(err,category){
                if(err){
                    console.log(err)
                    res.json({ status:-1, data:err,  msg:''})
                    
                }else{
                    res.json({status:0,data:category,msg:''})
                }
            })
        })
        
    }
})
router.get('/del',(req,res) => {
    if(!req.query.id){
        res.json({ status:-1, data:null, msg:'id不能为空'})
    }else{
        Category.deleteOne({id:req.query.id},function(err,doc){
            if(err){
                res.json({ status:-1, data:err,  msg:''})
            }else{
                res.json({ status:0, data:doc,  msg:''})
            }
        })
    }
    
})
module.exports = router;