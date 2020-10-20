//1.引入express
const express = require('express')

//2.创建一个服务对象
const app = express()
//应用一个express内置的中间件去解析post请求中urlencoded编码格式的参数
app.use(express.urlencoded({extended:true}))
//应用一个express内置的中间件去解析post请求中json编码格式的参数
app.use(express.json())

app.get('/demo',(request,response)=>{
	// console.log('我收到的query参数为：',request.query);
	// console.log('我收到的params参数为：',request.params); //注意要用关键字站位
	// console.log('我收到的请求体参数为(urlencoded)：',request.body);
	// console.log('我收到的请求体参数为(json)：',request.body);
	// console.log(request.get('Host'));
	response.send('你好啊')
})


app.get('/test',(request,response)=>{
	// response.send('你好啊！！！！！')
	// response.download('./vue.jpg')
	// response.sendFile(__dirname+'/video1.mp4')
	// response.sendFile(__dirname+'/demo.zip')
	// response.redirect('https://www.baidu.com')
	// response.set('token','drxfcgvhokplertyuio')
	// console.log(response.get('X-Powered-By'));
	// response.status(299)
	response.send('你好啊！！！！！')
})

//3.指定端口号，开启服务器
app.listen(8090,(err)=>{
	if(err) console.log('服务器启动失败',err);
	else console.log('服务器开启成功！');
})