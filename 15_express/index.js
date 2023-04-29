const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")
// 引入fileStore
const FileStore = require('session-file-store')(session)
// 引入uuid
const uuid=require("uuid").v4

let STUDENT_ARR = require("./data/student.json")
const fs = require("fs/promises")
const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

// 将ejs设置为默认的模板引擎 
app.set("view engine", 'ejs')
// 配置模板的路径
app.set("views", path.resolve(__dirname, "views"))
// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, 'public')))
// 设置自动解析响应体
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    store: new FileStore({
        // path用来指定session本地文件的路径
        path:path.resolve(__dirname,'./sessions'),
        // 加密的盐
        secret:"haha",
        // session的有效时间,秒,默认一个小时
        // ttl:10,
        // 默认情况下，FileStore会每隔一小时，清除一次session对象
        // reapInterval 用来指定清除session的间隔，单位秒，默认一小时
        // reapInterval:10, 
    }),
    secret: "dazhaxie",
    cookie:{
        maxAge:1000*3600
    }
}))

/*
    csrf攻击
        -跨站请求伪造攻击
        -http://localhost:3000/students/delete?id=8  
        -现在大部分浏览器都不会在跨域的情况下自动发送cookie,这个设计就是为了避免csrf攻击
        -如何解决：
            1.使用referer头来检查请求的来源
            2.使用验证码
            3.尽量使用post请求(结合token)
        -token(令牌)
            -可以在创建表单时随机生成一个令牌，然后将令牌存储到session中，并通过模板发送给用户，用户提交表单时，必须将token发回才可以进行后续操作(可以通过uuid来生成token)
 */

// 使路由生效
app.use("/students", require("./routes/student"))

app.get('/', (req, res) => {
    res.render("login")
})

app.post("/login", (req, res) => {
    const { username, password } = req.body
    if (username === 'admin' && password === '123123') {
        // 登录成功后将用户信息放入到session
        // 这里仅仅将loginUser添加到了内存中的session中，而没有将值写入到文件中
        req.session.loginUser = username
        // 为了使session可以立即存储，需要手动调用save
        req.session.save(()=>{
            res.redirect('/students/list')
        })
    } else {
        res.send("用户名或密码错误")
    }
})
app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
})

app.use((req, res) => [
    res.status(404).send("<h1>您访问的页面已经被外星人劫持!</h1>")
])

app.listen(3000, () => {
    console.log("服务器已启动~");
})