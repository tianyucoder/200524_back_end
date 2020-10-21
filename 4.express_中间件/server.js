const express = require('express')
const bodyParser = require('body-parser')

const app = express()
// app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

/* 
	关于中间件你要知道的
		1.本质：函数，可以接收到：request,response,next
		2.分类：内置中间件、第三方、全局中间件、路由器中间件
*/

//应用级中间件(全局中间件)----第一种写法
/* app.use((request,response,next)=>{
	const referer = request.get('Referer')
	const miniReferer = referer ? referer.split('/')[2].split(':')[0] : ''
	if(miniReferer !== '127.0.0.1') response.sendFile(__dirname+'/err.png')
	else next()
}) */

//应用级中间件(全局中间件)----第二种写法
function holdSteal (request,response,next){
	request.a = '0524'
	const referer = request.get('Referer')
	const miniReferer = referer ? referer.split('/')[2].split(':')[0] : '127.0.0.1'
	if(miniReferer !== '127.0.0.1') response.sendFile(__dirname+'/err.png')
	else next()
}

app.get('/getpicture',holdSteal,(request,response)=>{
	console.log(request.a);
	response.sendFile(__dirname+'/vue.jpg')
})

app.post('/getData',(request,response)=>{
	console.log(request.body);
	response.send({name:'老刘',age:19})
})

app.get('/data',(request,response)=>{
	response.send('some data')
})


app.listen(8080,(err)=>{
	if(!err) console.log('服务器开启成功了！');
	else console.log(err);
})
