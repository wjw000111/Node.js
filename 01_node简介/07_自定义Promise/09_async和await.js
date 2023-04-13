// 参考文档：https://nodejs.dev/en/
function fn(){
    return Promise.resolve(10)
}
fn().then(r=>{
    console.log(r);
})

/*
    通过async可以快速的创建异步函数
        1.异步函数的返回值会自动封装到一个Promise中返回
    
    2.在async声明的异步函数中可以使用await关键字来调用异步函数
 */

// 1
// async function fn2(){
//     return 20
// }
// let result=fn2()
// console.log(result);  //返回结果是一个Promise
// fn2().then(r=>{
//     console.log(r);
// })


// 2
function sum(a,b){
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve(a+b)
        }, 2000);
    })
}
/*
    Promise解决了异步调用中回调函数问题，
        虽然通过链式调用解决了回调地狱，但是链式调用太多以后还是不好看
        我多想以同步的方式调用异步的代码
 */
async function fn3(){
    // sum(123,456).
    // then(r=>sum(r,7))
    // .then(r=>sum(r,8))
    // .then(r=>console.log(r))
    
    // 当我们通过await去调用异步函数，他会暂停代码的运行直到异步代码执行有结果时，才会将结果返回
    // 注意await只能用于async声明的异步函数中，或es模块的顶级作用域中
    // await阻塞的只是异步函数内部的代码，不会影响外部的代码
    // 通过await调用异步代码时，需要通过try-catch来处理异常
    try{
        let result=await sum(123,456)
        result=await sum(result,7)
        result=await sum(result,8)
        console.log(result);
    }catch(e){
        console.log("出错了");
    }
}
fn3()
console.log("全局中的输出");

// 如果async声明的函数中没有写await,那么里边会依次执行,只不过返回值是Promise
// async function fn4(){
//     console.log(1);
//     console.log(2);
//     console.log(3);
//     return 10
// }
// fn4()
// console.log(4); //执行顺序1,2,3,4


// fn4和fn5等价,效果一模一样
// function fn5(){
//     return new Promise(resolve=>{
//         console.log(1);
//         console.log(2);
//         console.log(3);
//         resolve(10)
//     })
// }

async function fn4(){
    console.log(1);
    /*
        当我们使用await调用函数后，当前函数后面的所有代码，会在当前函数执行完毕后，被放入到微任务队列中 
     */
    await console.log(2);
    console.log(3);
}
fn4()
console.log(4); //1,2,4,3
// fn5等价于上面fn4  
function fn5(){
    return new Promise(resolve=>{
        console.log(1);
        console.log(2);
        resolve()
    }).then(r=>{
        console.log(3);
    })
}

async function fn6(){
    await console.log("哈哈");
}
fn6()
// 使用立即执行函数
;(async ()=>{
    await console.log("哈哈");
})()