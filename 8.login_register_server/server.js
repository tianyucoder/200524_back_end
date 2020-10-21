const express = require('express')
//引入db模块---用于连接数据库
const db = require('./db')

//引入student模型对象---用于增删改查用户
const userModel = require('./models/userModel')
//引入cookie-parser，用于解析cookie
const cookieParser = require('cookie-parser')
//引入express-session，用于操作session
const session = require('express-session');
//引入connect-mongo，用于做session的持久化(非必须)
const MongoStore = require('connect-mongo')(session);
//引入md5加密
const md5 = require('md5')
// const sha1 = require('sha1')
//创建一个服务对象
const app = express()

//应用中间件
//解析请求体中urlencoded编码的参数为一个对象
app.use(express.urlencoded({extended:true}))
//解析请求体中json编码的参数为一个对象
app.use(express.json())
//应用解析cookie的中间件
app.use(cookieParser())
//配置express中操作session
app.use(session({
	name: 'session_id',   //设置cookie的name
	saveUninitialized: false, //是否在存储内容之前创建会话
	secret: 'atguigu', //参与加密的字符串（又称签名）
	cookie: {
		 httpOnly: true, // 开启后前端无法通过 JS 操作cookie
		 maxAge: 1000*60*60 // 设置cookie的过期时间
	},
	store: new MongoStore({
		url: 'mongodb://localhost:27017/education_sessions_container',
	})
}))


;(async()=>{
	//等待数据库连接
	await db
	//响应用户注册
	app.post('/register',async(request,response)=>{
		//获取客户端传递过来的：邮箱、密码、昵称
		const {email,pwd,nick_name} = request.body
		//去数据库中查询该用户是否注册过
		const findResult = await userModel.findOne({email})
		//若未注册
		if(!findResult){
			await userModel.create({email,pwd:md5(pwd),nick_name})
			response.send({
				code:20000,
				msg:'注册成功！',
				data:{}
			})
		}else{
			response.send({
				code:20001,
				msg:'用户已注册！',
				data:{}
			})
		}
	})

	app.post('/login',async(request,response)=>{
		//获取客户端传递过来的：邮箱、密码、昵称
		const {email,pwd} = request.body
		//去数据库中查询该用户是否注册过
		const findResult = await userModel.findOne({email,pwd:md5(pwd)})
		//若登录成功
		if(findResult){
			request.session._id = findResult._id
			response.send({
				code:20000,
				msg:'登录成功！',
				data:findResult
			})
		}else{
			//登录失败
			response.send({
				code:20001,
				msg:'登录失败！',
				data:{}
			})
		}
	})

	app.post('/verify_login',async(request,response)=>{
		const {_id} = request.session
		const findResult = await userModel.findOne({_id})
		if(findResult){
			response.send({
				code:20000,
				msg:'验证身份成功！',
				data:findResult
			})
		}else{
			response.send({
				code:20001,
				msg:'用户身份不合法，请重新登录',
				data:findResult
			})
		}
	})

	app.listen(8080,(err)=>{
		if(!err) console.log('服务器ok了');
		else console.log(err);
	})
	
})()

