var express = require('express');
var { User } = require('../mongoose')
var router = express.Router();
const SECRET = 'ewgfvwedfhsghdahjggvsvsd'
const jwt = require('jsonwebtoken')
const assert = require('http-assert')
// const auth = require('../common/is_auth')
// 新用户注册
router.post('/register',async(req,res) => {
  if(!req.body.name||!req.body.psw){
    res.json({
      status:-1,
      data:null,
      msg:'格式不正确'
    })
  }else{
    const user  = await User.create({
      name:req.body.name,
      psw:req.body.psw,
    })
    const token = jwt.sign({
      id:String(user._id)
    },SECRET)
    let data = JSON.parse(JSON.stringify(user));
    data.token = token
    res.json({
      status:0,
      data:data,
      msg:'注册成功！'
    })
  }
  
})
// 用户登录
router.post('/login',async(req,res) => {
    const user = await User.findOne({
      name:req.body.name
    })
    if(!user) {
      return res.json({
        status:-1,
        data:user,
        msg:'用户不存在！'
      })
    }
    const isPasswordValid = require('bcryptjs').compareSync(
      req.body.psw,
      user.psw
    )
    if(!isPasswordValid){
      return res.json({
        status:-1,
        data:user,
        msg:'密码错误！'
      })
    }
    const token = jwt.sign({
        id:String(user._id)
    },SECRET)
    let data = JSON.parse(JSON.stringify(user));
    data.token = token
    res.json({
      status:0,
      data:data,
      msg:'登录成功！'
    })
})
const auth = async(req,res,next) => {
  const raw = String(req.get("Authorization")).split(' ').pop();
  const {id} = jwt.verify(raw,SECRET)
  req.user = await User.findById(id)
  next()
}
router.get('/get',auth,async(req,res) => {
  if(req.user){
    res.json({
      status:0,
      data:req.user,
      msg:'获取成功！'
    })
  }else{
    res.json({
      status:-1,
      data:null,
      msg:'获取失败'
    })
  }
  
})
module.exports = router;

