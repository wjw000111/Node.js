const express=require("express")
const router=express.Router()
const path=require("path")
let STUDENT_ARR=require("../data/student.json")
const fs=require("fs/promises")

// 学生列表的路由
router.get('/list',(req,res)=>{
    if(req.cookies.useranme){
        res.render('students',{stus:STUDENT_ARR})
    }else{
        res.redirect('/')
    }
    
})
// 添加学生的路由
router.post('/add',(req,res,next)=>{
    // 路由要做什么
    // 1.获取用户填写的信息
    const id=STUDENT_ARR.at(-1)?STUDENT_ARR.at(-1).id+1:1
    const newUser={
        id,
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        address:req.body.address,
    }
    // 2.验证用户信息
    // 3.将用户信息添加到数组中
    STUDENT_ARR.push(newUser)
    // 将新数据写入json文件中
    // 调用next，交由后续路由继续处理
    next()
})
// 删除学生的路由
router.get('/delete',(req,res,next)=>{
    // 获取要删除学生的id
    const id=+req.query.id
    console.log(typeof id);
    // 根据id删除学生
    STUDENT_ARR=STUDENT_ARR.filter(stu=> stu.id !== id)
    // 将新的数组写入到文件
    next()
})
// 修改学生的路由
router.get('/to-update',(req,res)=>{
    const id=+req.query.id
    const student = STUDENT_ARR.find(stu=>stu.id === id)
    res.render('update',{stu:student})
})
router.post('/update-student',(req,res,next)=>{
    const {id,name,age,gender,address}=req.body
    // 根据学生的id获取学生对象
    const student=STUDENT_ARR.find(item=>item.id == id)
    student.name=name
    student.age=+age
    student.gender=gender
    student.address=address
    next()
})

// 处理存储文件的中间件
router.use((req,res)=>{
    fs.writeFile(path.resolve(__dirname,"../data/student.json"),JSON.stringify(STUDENT_ARR)).then(()=>{
        // 4.返回响应
    // 直接在添加路由中渲染ejs,会面临表单重复提交的问题
    // 重定向的作用是告诉浏览器你向另外一个地址再发一次请求
    // res.render('students',{stus:STUDENT_ARR})
        res.redirect('/students/list')
    }).catch(()=>{
        // 报错处理
        res.send("操作失败!")
    })
})

module.exports=router

