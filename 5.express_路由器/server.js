//1.引入express
const express = require('express')
const studentRouter = require('./Routers/students')
const loginRouter = require('./Routers/login')

//2.创建一个服务对象
const app = express()

app.use(loginRouter())
app.use(studentRouter())

//3.指定端口号，开启服务器
app.listen(8080,(err)=>{
	if(err) console.log('服务器启动失败',err);
	else console.log('服务器开启成功！');
})