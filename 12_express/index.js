const express=require("express")
const path=require("path")
const app=express()
const cookieParser=require("cookie-parser")

let STUDENT_ARR=require("./data/student.json")
const fs=require("fs/promises")
const userRouter=require("./routes/user")
const goodsRouter=require("./routes/goods")

/*
    crud,增删改查
 */

// 将ejs设置为默认的模板引擎
app.set("view engine",'ejs')
// 配置模板的路径
app.set("views",path.resolve(__dirname,"views"))
// 配置静态资源路径
app.use(express.static(path.resolve(__dirname,'public')))
// 设置自动解析响应体
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// 使路由生效
// app.use('/user',userRouter)
// app.use('/goods',goodsRouter)
app.use("/students",require("./routes/student"))
app.get('/',(req,res)=>{
    res.render("login")
})

app.get('/get-cookie',(req,res)=>{
    //给客户端发送一个cookie
    res.cookie("username","admin") 
    res.send("cookie已发送")
})
app.get('/hello',(req,res)=>{
    /* 
        需要安装中间件来使得express可以解析cookie
            1.安装cookie-parser
            2.引入
                const cookieParser=require("cookie-parser")
            3.设置中间件
                app.use(cookieParser())
     */
    // req.cookies用来读取客户端发回的cookie
    console.log(req.cookies);
    res.send("hello路由")
})

app.post("/login",(req,res)=>{
    /*
        这个登录形同虚设,HTTP协议 是一个无状态的协议，服务器无法区分请求是否发送自同一个客户端
        cookie
            -cookie是HTTP协议协议中用来解决无状态问题的技术
            -cookie的本质就是一个头 
                -服务器以响应头的形式将cookie发送给客户端，客户端收到以后将其存储并在下次向服务器发送请求时将其传回,这样服务器就可以根据cookie来识别出客户端
     */
    // 获取用户的用户名和密码
    const {username,password}=req.body
    if(username==='admin' && password === '123123'){
        // 登录成功
        // res.send("登录成功")
        res.cookie("useranme",username)
        res.redirect('/students/list')
    }else{
        res.send("用户名或密码错误")
    }
})

app.use((req,res)=>[
    res.status(404).send("<h1>您访问的页面已经被外星人劫持!</h1>")
])

app.listen(3000,()=>{
    console.log("服务器已启动~");
})