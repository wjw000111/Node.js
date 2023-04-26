const express=require("express")
const path=require("path")
const app=express()
let STUDENT_ARR=require("./data/student.json")
const fs=require("fs/promises")

/*
    crud,增删改查
 */

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
    fs.writeFile(path.resolve(__dirname,"./data/student.json"),JSON.stringify(STUDENT_ARR)).then(()=>{
        // 4.返回响应
    // 直接在添加路由中渲染ejs,会面临表单重复提交的问题
    // 重定向的作用是告诉浏览器你向另外一个地址再发一次请求
    // res.render('students',{stus:STUDENT_ARR})
        res.redirect('/students')
    }).catch(()=>{
        // 报错处理
    })
})

/*
    删除
        -点击删除链接后，删除当前数据
        -点击 白骨精删除->删除id为5的学生
        -流程：
            1.点击白骨精的删除链接
            2.向路由发送请求（写一个路由）
            3.路由中，获取学生的id为n ,删除id为n的学生，将新的数组写入文件,重定向到学生列表页面
 */
app.get('/delete',(req,res)=>{
    // 获取要删除学生的id
    const id=+req.query.id
    console.log(typeof id);
    // 根据id删除学生
    STUDENT_ARR=STUDENT_ARR.filter(stu=> stu.id !== id)
    // 将新的数组写入到文件
    fs.writeFile(path.resolve(__dirname,"./data/student.json"),JSON.stringify(STUDENT_ARR)).then(()=>{
        // 4.返回响应
    // 直接在添加路由中渲染ejs,会面临表单重复提交的问题
    // 重定向的作用是告诉浏览器你向另外一个地址再发一次请求
    // res.render('students',{stus:STUDENT_ARR})
        res.redirect('/students')
    }).catch(()=>{
        // 报错处理
    })
})

/*
    -点击修改链接后，显示一个表单，表单中应该有要修改的学生的信息，用户对学生信息进行修改，修改后点击按钮提交表单
    -流程：
        1.点击孙悟空的修改链接，
        2.跳转到一个路由，这个路由会返回一个页面，页面中有一个表单,表单中应该显示孙悟空的各种信息
        3.用户填写表单，点击按钮提交,提交到一个新的路由:
            -获取学生信息，并对学生信息进行修改
 */
app.get('/to-update',(req,res)=>{
    const id=+req.query.id
    const student = STUDENT_ARR.find(stu=>stu.id === id)
    res.render('update',{stu:student})
})
app.post('/update-student',(req,res)=>{
    const {id,name,age,gender,address}=req.body
    // 根据学生的id获取学生对象
    const student=STUDENT_ARR.find(item=>item.id == id)
    student.name=name
    student.age=+age
    student.gender=gender
    student.address=address
    fs.writeFile(path.resolve(__dirname,"./data/student.json"),JSON.stringify(STUDENT_ARR)).then(()=>{
        // 4.返回响应
    // 直接在添加路由中渲染ejs,会面临表单重复提交的问题
    // 重定向的作用是告诉浏览器你向另外一个地址再发一次请求
    // res.render('students',{stus:STUDENT_ARR})
        res.redirect('/students')
    }).catch(()=>{
        // 报错处理
    })
})
app.use((req,res)=>{
    res.status(404)
    res.send("<h1>您访问的地址已被外星人劫持</h1>")
})
app.listen(3000,()=>{
    console.log("服务器已启动~");
})