const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.get('/demo',(request,response)=>{
	response.send('我什么cookie也没给你')
})

//给客户端(浏览器)“种”下一个会话cookie
app.get('/demo1',(request,response)=>{
	response.cookie('name','tom')
	response.send('我给你种下了一个会话cookie，你去看看吧')
})
//给客户端(浏览器)“种”下一个持久化的cookie
app.get('/demo2',(request,response)=>{
	response.cookie('age',19,{maxAge:1000 * 30})
	response.send('我给你种下了一个持久化cookie，你去看看吧')
})
//通知客户端(浏览器)删除cookie
app.get('/demo3',(request,response)=>{
	response.clearCookie('age')
	response.clearCookie('name')
	response.send('不好意思，我删除了你所有的cookie')
})
//读取客户端(浏览器)带过来的cookie
app.get('/demo4',(request,response)=>{
	console.log(request.cookies);
	response.send('我会读取你携带过来的cookie')
})

app.listen(8080,(err)=>{
	if(!err) console.log('服务器开启成功了！');
	else console.log(err);
})
