var express = require('express');
var { User } = require('../mongoose')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express,Very Goood' });
});
router.get("/addUser",function (request, response) {
    let data = {
      name: request.query.name,
      age: request.query.age,
    }
    console.log(data)
    var addUser = new User(data)
    addUser.save()
    response.send(JSON.stringify(data))
})
router.post('/register',(req,res) => {
  console.log('/register',req.body)
  // console.log('/register',req.query)
  // res.send(" post successfully!");
})
router.post('login',(req,res) => {
  if(req.body.username == 'admin' && req.body.pwd == 'admin123'){
    req.session.userName = req.body.username; // 登录成功，设置 session
    res.redirect('/');
  }
  else{
    res.json({ret_code : 1, ret_msg : '账号或密码错误'});// 若登录失败，重定向到登录页面
  }
})
module.exports = router;
