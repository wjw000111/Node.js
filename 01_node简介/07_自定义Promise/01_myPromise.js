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
    }
    // 方法1，箭头函数
    // #resolve=()=>{
    //     console.log(this);
    // }
    // 私有的reject(),用来存储拒绝的数据
    #reject(reason){}

    // 添加一个用来读取数据的then方法
    then(onFulfilled,onRejected){
        if(this.#state===PORMISE_STATE.FULFILLED){
            onFulfilled(this.#result)
        }
    }
}
const mp=new MyPromise((resolve,reject)=>{
    resolve("孙悟空")
    // resolve("猪八戒")
})
mp.then((result)=>{
    console.log("读取数据",result);
})