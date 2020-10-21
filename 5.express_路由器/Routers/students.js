const express = require('express')
const {Router} = express
const router = new Router()

module.exports = ()=>{
	router.get('/students',(request,response)=>{
		response.send('获取所有students成功')
	})
	
	router.delete('/students',(request,response)=>{
		response.send('删除一个student成功')
	})
	return router
}