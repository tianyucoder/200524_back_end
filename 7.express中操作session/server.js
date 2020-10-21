const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express()
//应用cookie解析中间件
app.use(cookieParser())
//应用session中间件
app.use(session({
	name: 'session_id',   //设置cookie的name
	saveUninitialized: false, //是否在存储内容之前创建会话
	secret: 'atguigu', //参与加密的字符串（又称签名）
	cookie: {
		 httpOnly: true, // 开启后前端无法通过 JS 操作cookie
		 maxAge: 1000*60*60 // 设置cookie的过期时间
	},
	store: new MongoStore({
		url: 'mongodb://localhost:27017/sessions_container',
	})
}))

app.get('/demo',(request,response)=>{
	response.send('我什么cookie也没给你')
})

app.get('/demo1',(request,response)=>{
	request.session.name = 'tom'
	response.send('我为你开启了一个服务器端session存储，存入了一些东西，我给你也返回了一个cookie，cookie中的key是session_id,value是session的编号')
})
app.get('/demo2',(request,response)=>{
	console.log(request.session.name);
	response.send('我收到了你带过来的cookie，读取到了其中的session编号，我拿着编号，去我的内存中做匹配，如果匹配上那就读取出当年存储的信息——name')
})



app.listen(8080,(err)=>{
	if(!err) console.log('服务器开启成功了！');
	else console.log(err);
})
