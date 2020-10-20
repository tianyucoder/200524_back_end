//引入db模块---用于连接数据库
const db = require('./db')
//引入student模型对象---用于增删改查学生
const stuModel = require('./models/studentModel')

;(async()=>{
	await db
	stuModel.create({
		stu_id:'001',
		name:'志勇',
		age:21,
		sex:"男",
		hobby:['抽烟','喝酒','喝酒'],
		other_info:'一个比较凶的男人'
	}).then(
		value => {console.log('数据新增成功',value);},
		reason => {console.log('数据新增失败',reason);}
	)
})()

