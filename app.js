'use strict';//打开Javascript的"strict mode"

//引入express模块
var app = require('express')()
// 使用 session 中间件
var session = require('express-session');
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));
// 使用bodyparder中间件，
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//解决本地跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization,content-Type,Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });
 
// 配置引擎
app.set('views','./views') // 添加视图路径
app.engine('html',require('ejs').renderFile) // 将EJS模板映射至".html"文件
app.set('view engine','html')

app.listen(3000) //监听端口


// 设置路由
var index = require('./routes/index');
app.use('/', index);
var users = require('./routes/users');
app.use('/users', users);
var categories = require('./routes/cate');
app.use('/categories', categories)
