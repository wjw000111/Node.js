/*
    express是node中的一个服务器软件，
        通过express可以快速在node中搭建一个web服务器
    -使用步骤：
        1.创建并初始化项目
            yarn init -y
        2.安装express
            yarn add express
        3.创建index.js，并编写代码

 */

// 引入express
const express=require("express")

// 获取服务器实例(对象)
const app=express()

// 启动服务器,3000端口
// 服务器启动后我们就可以通过3000端口来访问服务器了
// 计算机里有多个软件，那么我们怎么知道对方是访问哪个软件，相当于楼里面额门牌号，当客户端访问服务器，假设端口是3000，就由express这个服务器来处理
// 协议名://ip地址:端口号/路径
// http://localhost:3000
// http://127.0.0.1:3000
app.listen(3000,()=>{
    console.log("服务器已经启动~");
})

/*
    如果希望服务器可以正常访问，则需要为服务器设置路由，路由可以根据不同的请求方式和请求地址来处理数据的请求
    app.EMTHOD(...),METHOD可以是get,post,... 

    中间件
        -在express我们使用app.use来定义一个中间件(通常用来权限检查)，中间件作用和路由很像，用法很像，但是中间件不区分请求的方式，只看路径
        -和路由的区别：
            1.会匹配所有请求
            2.路径设置父目录
 */
// next是回调函数的第三个参数,他是一个函数，调用函数后，可以触发后续的路由,next()不能在响应处理完毕后调用
app.use('/',(req,res,next)=>{
    console.log("111",Date.now());
    // res.send("<h1>111</h1>")
    next()  //放行，我不管了
})
app.use('/',(req,res)=>{
    console.log("222",Date.now());
    res.send("<h1>222</h1>")
})
app.use('/',(req,res)=>{
    console.log("333",Date.now());
    res.send("<h1>333</h1>")
})


// 路由的回调函数执行时，会接收到三个参数，第一个request,第二个response
app.get('/',(req,res)=>{
    console.log("有人访问我了~");
    // 在路由中，应该做两件事
    // 读取用户的请求(request),req表示用户的请求信息，通过req可以获取到用户传递的信息
    console.log(req);

    // 根据用户的请求返回响应(response)，res表示服务器发送给客户端的响应信息，可以通过res来向客户端返回数据

    // 向客户端发送响应状态码
    // res.sendStatus(404)

    // status()用来设置响应状态码，但是不发送
    // send() 设置并发送响应体
    res.status(200)
    res.send("你的请求没问题，但就是不给你看")
})

app.get('/hello',(req,res)=>{
    res.send("<h1>这是我的第一个服务器</h1>")
})

