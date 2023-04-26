// 核心模块是node中自带的模块，可以在node中直接使用
// window是浏览器的宿主对象，在node中是没有的
// global是node中的全局对象，作用类似于window
// ES标准下，全局变量的标准名应该是 blobalThis , 浏览器中的globalThis就是window

console.log(globalThis===global);  //true

/*
    核心模块
        process
            -表示当前node的进程
            -通过该对象，可以获取进程的信息，或者对进程做各种操作
            -研究如何使用
                1.process是一个全局变量，可以直接使用
                2.有哪些属性和方法：
                    process.exit()
                        -结束当前进程,终止node
                    process.nextTick(callback[,...args])
                        -将函数插入到tick队列中
                        -tick队列中的代码，会在下一次事件循环之前执行，会在微任务队列和宏任务队列中任务之前执行
                
                调用栈
                tick队列
                微任务队列
                宏任务队列
 */
console.log(process);

// console.log(111);
// process.exit(0)   //里面的0是状态码
// console.log(222);
// console.log(333);

setTimeout(() => {
    console.log(1);
}, 0);
queueMicrotask(()=>{
    console.log(2);
}) 
process.nextTick(()=>{
    console.log(3);
})
console.log(4);