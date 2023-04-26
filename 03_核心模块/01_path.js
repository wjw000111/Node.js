/*
    path
        -path表示的路径
        -通过path可以用来获取各种路径
        -要使用path，需要先对其进行引用
        -方法：
            path.resolve([...paths])
                -用来生成一个绝对路径
                    相对路径：./xxx,../xxx ,xxx
                    绝对路径：C:\xxx,/User/xxx,在网络中:http://www.xxxx,https://www.xxxx/...
                -如果直接调用resolve，则返回当前的工作目录
                    C:\Users\15275\Desktop\study\前端\Node.js
                    -注意，我们通过不同方式执行代码时，他的工作目录是有可能发生变化的，
                -如果将相对路径作为参数，则resolve会自动将其转换为绝对路径,
                    此时根据工作目录的不同，它所产生的绝对路径也不同     
                -一般会将一个绝对路径作为第一个参数，一个相对路径作为第二个参数，这样他会自动计算出最终的路径
 */
const path=require("node:path")
console.log(path);

// const result=path.resolve()
// console.log(result);

// const result=path.resolve("./hello.js")
// // C:\Users\15275\Desktop\study\前端\Node.js\hello.js
// console.log(result);

// const result=path.resolve("C:\\Users\\15275\\Desktop\\study\\前端\\Node.js\\03_包管理器","../hello.js")
// console.log(result);


// 最终形态
// 以后在使用路径时，尽量通过path.resolve()来生成路径
// const result=path.resolve(__dirname,"./hello.js")
// console.log(result);


/*
    fs(file System)
        -fs用来帮助node来操作磁盘中的文件
        -文件操作也就是所谓的IO操作，input,output,
        -使用fs模块，同样需要引入
 */

// const fs=require("node:fs")
// readFileSync()同步的读取文件的方法，会阻塞后边代码的执行
// 当我们通过fs模块读取磁盘中的数据，读取到的数据总会以Buffer对象的形式返回
// Buffer是一个临时用来存储数据的缓冲区
// const buf=fs.readFileSync(path.resolve(__dirname,"./hello.txt"))
// console.log(buf.toString());

// readFile() 异步读取文件的方法
// fs.readFile(
//     path.resolve(__dirname,'./hello.txt'),
//     (err,buffer)=>{
//         if(err){
//             console.log("出错了");
//         }else{
//             console.log(buffer.toString());
//         }
//     }
// )
// console.log("后续代码");

/*
     Promise版本的fs方法

 */
// const fs=require("node:fs/promises")
// fs.readFile(path.resolve(__dirname,'./hello.txt')).then(buffer=>{
//     console.log(buffer.toString());
// }).catch(e=>{
//     console.log("出错了");
// })


// await实现
const fs=require("node:fs/promises")
;(async ()=>{
    try{
        const buffer=await fs.readFile(path.resolve(__dirname,'./hello.txt'))
        console.log(buffer.toString());
    }catch(e){
        console.log("出错了");
    }
})()