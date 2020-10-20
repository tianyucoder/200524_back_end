/* 
	该文件主要负责创建student模型，用于对students集合进行：增删改查
*/
const mongoose = require('mongoose')

//1.请来一个保安-----引入Schema模式对象
const {Schema} = mongoose

//2.制定一套进入你家的规则------创建具体的约束
const studentSchema = new Schema({
	stu_id:{
		type:String, //限制学号只能是字符串类型
		required:true, //限制学号是必填项
		unique:true //限制学号是唯一不可重复的
	},
	name:{
		type:String,
		required:true
	},
	age:{
		type:Number,
		required:true
	},
	sex:{
		type:String,
		required:true
	},
	hobby:{
		type:[String] //必须为字符串组成的数组
	},
	other_info:{
		type:Schema.Types.Mixed //接收所有类型
	},
	enable_flag:{
		type:String,
		default:'Y'
	},
	date:{
		type:Date,
		default:Date.now()
	}
})

//3.告诉保安你制定的规则-------创建模型对象
const studentModel = mongoose.model('students',studentSchema)

module.exports = studentModel
