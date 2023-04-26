// Promise就是一个用来存储数据的对象
// 但是由于Promise存取的方式特殊，所以可以直接将异步调用的结果存储到Promise中

// const promise = new Promise((resolve, reject) => {
//     // resolve("周一到周五，不见不散")
//     reject("周一到周五，不见不散")
// })

/*
    promise中的
        then
        catch 
        -这三个方法都会返回一个新的Promise,promise中存储回调函数的返回值\
        finally 
            -finally 的返回值，不会存储到新的proimse中
 */
// promise.then((result) => { console.log(result); }, (reason) => { console.log(reason); })

// const p2=promise.then(result=>{
//     console.log("回调函数",result);
//     return "锄禾日当午"
// })

// console.log(p2);  //新的promise
// setTimeout(() => {
//     console.log(p2);
// }, 1000);

// 后边的方法(then 和catch)读取上一步的执行结果，如果上一步的执行结果不是当前想要的结果，则跳过当前的方法
// 当promise出现异常时，而整个调用链中都没有出现catch,则异常会抛出
const promise = new Promise((resolve, reject) => {
    // resolve("周一到周五，不见不散")
    reject("周一到周五，不见不散")
})

promise
.then(r=>console.log("第一个then",r))
.catch(r=>{
    throw new Error("报个错") //后续没有catch对错误进行处理，将错误抛出
    console.log("异常处理",r)
    return "嘻嘻"
    }).
    then(r=>console.log("第二个then",r))

// promise.then(result=>{
//     console.log("回调函数",result);
//     return "锄禾日当午"
// }).then((result)=>{
//     console.log("第二个then",result);
//     return "超哥真快乐"
// }).then(result=>{
//     console.log(result);
// })



// 原版
// function sum(a,b,cb){
//     setTimeout(()=>{
//         cb(a+b)
//     },1000)
// }
// sum(123,456,(result)=>{
//     console.log(result);
// })

// promise版本
function sum(a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(a+b)
        }, 1000);
    })
}
// 1.0 version
// sum(123,456).then((result)=>{
//     console.log(result);
// })
// 2.0 version
// sum(123,456)
// .then(result=>result+7)
// .then(result=>result+8)
// .then(result=>console.log(result))