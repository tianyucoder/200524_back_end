//引入mongoose
const mongoose = require('mongoose')

//使用mongoose连接数据库
mongoose.connect('mongodb://localhost:27017/education',{
	useNewUrlParser: true, //使用最新的url解析器
	useUnifiedTopology: true, //使用一个新的数据结构
	useCreateIndex:true,//使用一个新的索引器
})

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


//监测数据库的连接状态
mongoose.connection.on('open',(error)=>{
	if(error) console.log(error);
	else {
			console.log('数据库连接成功！');
			//增
			//#region 增--给回调函数
			/* studentModel.create({
				stu_id:'003',
				name:'渊哥',
				age:20,
				sex:"男",
				hobby:['抽烟','打台球','唱歌'],
				other_info:'北七家镇吴彦祖'
			},(err,data)=>{
				if(err) console.log('插入数据失败',err);
				else console.log('插入数据成功',data);
			}) */
			//#endregion
			//#region 增--不给回调，靠Promise
			/* studentModel.create({
				stu_id:'004',
				name:'志勇',
				age:21,
				sex:"男",
				hobby:['抽烟','喝酒','喝酒'],
				other_info:'一个比较凶的男人'
			}).then(
				value => {console.log('数据新增成功',value);},
				reason => {console.log('数据新增失败',reason);}
			) */
			//#endregion
				
			//查
			/* studentModel.findOne({age:19},{name:1,sex:1,_id:0}).then(
				value => {console.log('查询成功',value);},
				reason => {console.log('查询失败',reason);}
			) */

		};
})