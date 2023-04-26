const express=require("express")
const app=express()
const path=require("path")
// 配置静态资源的路径
// public http://ocalhost:3000
app.use(express.static(path.resolve(__dirname,"public")))

// 引入解析请求体的中间件
app.use(express.urlencoded())

// 创建一个数组来存储用户信息
const USERS=[
    {
        username:"admin",
        password:"123123",
        nickname:"超级管理员"
    },
    {
        username:"sunwukong",
        password:"123456",
        nickname:"齐天大圣"
    }

]


app.post('/login',(req,res)=>{
    // 通过req.body来获取post请求的参数(请求体中的参数),默认情况下express不会自动解析请求体,需要通过中间件为其增加功能
    // console.log(req.query);  //{}
    const username=req.body.username
    const password=req.body.password

    // if(username==='admin' && password==='123123'){
    //     res.send("<h1>登录成功</h1>")
    // }else{
    //     res.send("<h1>登录失败</h1>")
    // }
    
    // 获取到用户名和密码后，需要根据用户名去用户的数组中查找用户
    // for(const user of USERS){
    //     if(user.username===username){
    //         if(user.password===password){
    //             res.send(`<h1>${user.nickname}登录成功</h1>`)
    //             return
    //         }
    //     }
    //     res.send("<h1>用户名或密码错误</h1>")
    // }

    // 使用find方法实现
    const loginUser=USERS.find((item)=>{
        return item.username===username && item.password===password
    })
    if(loginUser){
        res.send(`<h1>${loginUser.nickname}登录成功</h1>`)
    }else{
        res.send("<h1>用户名或密码错误</h1>")
    }
})

app.post("/register",(req,res)=>{
    // 获取用户输入的数据
    const {username,password,repwd,nickname}=req.body
    console.log(username,password,repwd,nickname);
    const user=USERS.find(item=>{
        return item.username===username || item.nickname===nickname
    })
    if(!user){
        // 说明用户不存在，可以注册
        USERS.push({
            username,
            password,
            nickname
        })
        console.log(USERS);
        res.send("<h1>注册成功</h1>")
    }else{
        res.send("<h1>用户名已存在</h1>")
    }
})

app.listen(3000,()=>{
    console.log("服务器启动~");
})