//1.引入express
const express = require('express')

//2.创建一个服务对象
const app = express()

app.get('/demo',(request,response)=>{
	console.log(request);
	response.send('你好啊')
})

//3.指定端口号，开启服务器
app.listen(8090,(err)=>{
	if(err) console.log('服务器启动失败',err);
	else console.log('服务器开启成功！');
})