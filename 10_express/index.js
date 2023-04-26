const express=require("express")
const path=require("path")
const app=express()
const STUDENT_ARR=require("./data/student.json")
const fs=require("fs/promises")


// 将ejs设置为默认的模板引擎
app.set("view engine",'ejs')
// 配置模板的路径
app.set("views",path.resolve(__dirname,"views"))
// 配置静态资源路径
app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.get('/hello',(req,res)=>{
    res.send('hello')
})

app.get('/students',(req,res)=>{
   res.render('students',{stus:STUDENT_ARR})
})
// 创建一个添加学生信息的路由
app.post('/add-student',(req,res)=>{
    // 路由要做什么
    // 1.获取用户填写的信息
    const id=STUDENT_ARR.at(-1).id+1
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
    fs.writeFile(path.resolve(__dirname,"./data/student.json"),JSON.stringify(STUDENT_ARR)).then(()=>{
        // 4.返回响应
    // 直接在添加路由中渲染ejs,会面临表单重复提交的问题
    // 重定向的作用是告诉浏览器你向另外一个地址再发一次请求
    // res.render('students',{stus:STUDENT_ARR})
        res.redirect('/students')
    }).catch(()=>{
        
    })
    
    
})
app.use((req,res)=>{
    res.status(404)
    res.send("<h1>您访问的地址已被外星人劫持</h1>")
})
app.listen(3000,()=>{
    console.log("服务器已启动~");
})