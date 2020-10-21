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
	await db //等待数据库连接

	app.post('/register',async(request,response)=>{
		//获取客户端传递过来的：邮箱、密码、昵称
		const {email,pwd,nick_name} = request.body
		//去数据库中查询该用户是否注册过
		const findResult = await userModel.findOne({email})
		//若未注册
		if(!findResult){
			await userModel.create({email,pwd,nick_name})
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

	app.post('/login',(request,response)=>{
		
	})

	app.post('/verify_login',(request,response)=>{
		
	})

	app.listen(8080,(err)=>{
		if(!err) console.log('服务器ok了');
		else console.log(err);
	})
	
})()

