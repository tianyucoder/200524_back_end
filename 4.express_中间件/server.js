const express = require('express')

const app = express()

/* 
	关于中间件你要知道的
		1.本质：函数，可以接收到：request,response,next
		2.分类：内置中间件、第三方、全局中间件

*/

//应用级中间件(全局中间件)
app.use((request,response,next)=>{
	const referer = request.get('Referer')
	const miniReferer = referer ? referer.split('/')[2].split(':')[0] : ''
	if(miniReferer === '127.0.0.1') next()
	else response.sendFile(__dirname+'/err.png')
})

app.get('/getpicture',(request,response)=>{
	response.sendFile(__dirname+'/vue.jpg')
})
app.get('/data',(request,response)=>{
	response.sendFile('some data')
})


app.listen(8080,(err)=>{
	if(!err) console.log('服务器开启成功了！');
	else console.log(err);
})
