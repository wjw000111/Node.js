// 开启一个定时器
// setTimeout(() => {
//     console.log(1);
// }, 0);
/*
    Promise执行原理：
        -Promise 在执行，then就相当于给Promise了回调函数
            当Promise的状态由pending变为fulfilled,then的回调函数会被放入任务队列中
 */
// Promise.resolve(3).then((result)=>{console.log(result);})
// console.log(2);
// 顺序：2,3,1

/*
    JS是单线程的，他的运行基于事件循环机制(event loop)
        -调用栈：   
            -栈：
                栈是一种数据结构，后进先出
            -调用栈中，放的是要执行的代码
        -任务队列：
            -队列
                -队列是一种数据结构，先进先出
            -任务队列的是将要执行的代码
            -当调用栈中的代码执行完毕后，队列中的代码才会按照顺序依次进入栈中执行
            -在JS中任务队列有两种：
                -宏任务队列(大部分代码都去宏任务队列去排队)
                -微任务队列(Promise的回调函数，then,catch,finally)
        -整个流程：
            1.执行调用栈中的代码
            2.执行微任务队列中的所有任务
            3.执行宏任务队列中的所有任务

    全局作用域的代码一上来就是在调用栈中的

    queueMicrotask() 向微任务队列中添加一个任务
 */

// setTimeout(() => {
//     console.log(3);
// }, 0);
// Promise.resolve(4).then((result)=>{console.log(result);})
// queueMicrotask(()=>{
//     console.log(1);
// })
// console.log(2);
// 2,4,1,3


// Promise.resolve(1).then((result)=>{
//     setTimeout(() => {
//         console.log(result);
//     }, 0);
// })
// queueMicrotask(()=>{console.log(2);})
// 2,1

// Promise.resolve(1).then((result)=>{
//     Promise.resolve(result).then((result)=>{
//         console.log(result);
//     })
// })
// queueMicrotask(()=>{console.log(2);})
// 2,1

console.log(1);
setTimeout(() => {
    console.log(2);
}, 0);
Promise.resolve().then(()=>{console.log(3);})
Promise.resolve().then(()=>{
    setTimeout(() => {
        console.log(4);
    }, 0);
})
Promise.resolve().then(()=>{console.log(5);})
setTimeout(() => {
    console.log(6);
}, 0);
console.log(7);
// 1,7,3,5,2,6,4