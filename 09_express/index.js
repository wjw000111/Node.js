/*
    yarn init -y 
    yarn add espress 
    yarn add nodemon -D
    nvm use 18.15.0 , 更改node.js的版本，18.15版本中vue会报错
 */

const express=require("express")
const path=require("path")
const app=express()

const STUDENT_ARR=[
    {
        name:"孙悟空",
        age:18,
        gender:"男",
        address:"花果山",
    },
    {
        name:"猪八戒",
        age:28,
        gender:"男",
        address:"高老庄",
    },
    {
        name:"女儿国国王",
        age:16,
        gender:"女",
        address:"女儿国",
    },
]
let name="猪八戒"
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
app.get('/student',(req,res)=>{
    // 希望用户在访问student路由时，返回一个显示所有学生信息的页面
    /*
        html是静态页面，创建的时候什么样子，用户看到的就是什么样子，不会自动根据服务器中数据的变化而变化
        希望有这么一个东西，长得像页面，但他里面可以嵌入变量,这个东西在node中称为模板
        在node中有很多个模板引擎,都各具特色，本人独爱ejs    
        ejs是node中的一款模板引擎，使用步骤：
            1.安装ejs 
            2.配置express的模板引擎为ejs ，app.set("view engine",'ejs')
            3.配置模板路径，app.set("views",path.resolve(__dirname,"views"))
            注意：模板引擎需要被express渲染后才能使用
     */
    // res.render() 用来渲染一个模板引擎，并将其返回给浏览器
    // 可以将一个对象作为render的第二个参数传递,这样在模板中就可以访问到对象中的数据
    // <%=%>在ejs中输出内容时，会自动对字符串中的特殊符号进行转义,这个设计主要是为了避免xss攻击
    // res.render('students',{name:"孙悟空",age:18,gender:"男",hello:"<h1>你好啊</h1>"})
    // <%-%> 直接将内容输出, <%=%> , <% %>可以直接编写Js代码，js代码会在服务器中执行
    res.render("students",{name})
})
app.get('/set_name',(req,res)=>{
    name=req.query.name
    res.send("修改成功")
})
app.use((req,res)=>{
    res.status(404)
    res.send("<h1>您访问的地址已被外星人劫持</h1>")
})
app.listen(3000,()=>{
    console.log("服务器已启动~");
})