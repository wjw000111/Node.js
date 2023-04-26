/* 
    静态方法：
        Promise.resolve() 创建一个立即完成的Promise
        Promise.reject() 创建一个立刻拒绝的promise
        Promise.all([...]) ,同时返回多个promise的执行结果，其中有一个报错就返回错误
        Promise.allSettled([...]) 同时返回多个Promsie的执行结果(无论成功与否)，{status: 'rejected', reason: '报错了'}，{status: 'fulfilled', value: 14}
        Promise.race([...])  返回执行最快的promise,不考虑对错
        Promise.any([...])  返回完成最快的Promise,都报错才抛出错误
*/
Promise.resolve(10).then((result)=>console.log(result))
// 等价于
// new Promise((resolve,reject)=>{
//     resolve(10)
// })

function sum(a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(a+b)
        }, 1000);
    })
}
// Promise.all([sum(123,456),sum(12,34),sum(6,8),Promise.reject("报错了")]).then(r=>console.log(r))  //(3) [579, 46, 14]

// Promise.allSettled([
//     sum(123,456),
//     sum(12,34),
//     sum(6,8),
//     Promise.reject("报错了")
// ]).then(r=>{console.log(r)
// })

// Promise.race([
//     // Promise.resolve(111),
//     Promise.reject("报错了"),
//     sum(123,456),
//     sum(12,34),
//     sum(6,8),
// ]).then(r=>{console.log(r)
// }).catch((r)=>{
//     console.log("错误",r);
// })

Promise.any([
    Promise.reject(111),
    Promise.reject(222),
    Promise.reject(333),
    // sum(123,456),
    // sum(12,34),
    // sum(6,8),
]).then(r=>{console.log(r)
}).catch((r)=>{
    console.log("错误",r);
})