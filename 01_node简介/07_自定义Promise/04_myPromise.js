/*
    定义类的思路：
        1.先把功能都分析清楚了，再动手
        2.写一点想一点，走一步看一步
 */
const PORMISE_STATE={
    PENDING:0,
    FULFILLED:1,
    REJECTED:2,
}
class MyPromise{
    // 创建一个变量来存储Promise的结果
    #result
    // 创建一个变量来记录Promise的状态   
    #state=PORMISE_STATE.PENDING  //pending 0 ,fulfilled 1,rejected 2,

    // 创建一个变量来存储回调函数
    // #callback
    // 由于回调函数可能有多个，所以我们使用数组来存储回调函数
    #callbacks=[]

    constructor(executor){
        // 接收一个执行器作为参数
        executor(this.#resolve.bind(this),this.#reject.bind(this))  //调用回调函数
    }
    // 私有的resolve(),用来存储成功的数据
    #resolve(value){
        // console.log(`resolve被调用了，value的值是${value}`);
        // 禁止值被重复修改：
        if(this.#state!==PORMISE_STATE.PENDING) return
        this.#result=value  //报错，因为在下面resolve("孙悟空")时，并没有表明是哪个对象调用的，所以this是undefined,解决方法1.箭头函数,此时this指向mp(MyPromise),但是箭头函数会放到实例自身，而不是原型,浪费一点内存, 解决方法2：通过bind锁死this
        this.#state=PORMISE_STATE.FULFILLED //数据填充成功

        // 当resolve执行时，说明数据已经进来了，需要调用then的回调函数
        queueMicrotask(()=>{
            // this.#callback && this.#callback(this.#result) //有callback再调用，没有就不调用
            this.#callbacks.forEach(cb=>{
                cb()
            })
        })
    }
    // 方法1，箭头函数
    // #resolve=()=>{
    //     console.log(this);
    // }
    // 私有的reject(),用来存储拒绝的数据
    #reject(reason){}

    // 添加一个用来读取数据的then方法
    then(onFulfilled,onRejected){
        if(this.#state===PORMISE_STATE.PENDING){
            // 进入判断说明数据还没有进入Promise，将回调函数设置为callback的值
            // this.#callback=onFulfilled
            this.#callbacks.push(()=>{
                onFulfilled(this.#result)
            })
        }
        else if(this.#state===PORMISE_STATE.FULFILLED){
            /*
                目前then只能读取已存储进Promise的数据,不能读取异步存储的数据 
             */
            // onFulfilled(this.#result)
            /*
                then的回调函数，应该放入到微任务队列中执行，而不是直接调用 
             */
            queueMicrotask(()=>{
                onFulfilled(this.#result)
            })
        }
    }
}

const mp=new MyPromise((resolve,reject)=>{
    setTimeout(() => {
        resolve("孙悟空")
    }, 1000);
    // resolve("孙悟空")
    // resolve("猪八戒")
})
mp.then((result)=>{
    console.log("读取数据1",result);
})
//而我们写的不能反复读，由于后面的回调函数参数覆盖了前面的，所以只会调用最后一次的读取数据
mp.then((result)=>{
    console.log("读取数据2",result);
})

// ：原装的Promise可以反复读取数据
// const p=Promise.resolve(1)
// p.then(r=>console.log(r))
// p.then(r=>console.log(r))