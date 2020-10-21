const express = require('express')
const {Router} = express
const router = new Router()

module.exports = ()=>{
	router.get('/phone_login',(request,response)=>{
		response.send('手机号登录成功')
	})
	
	router.get('/pwd_login',(request,response)=>{
		response.send('用户名+密码登录成功')
	})
	
	router.get('/github_login',(request,response)=>{
		response.send('github登录成功')
	})
	return router
}