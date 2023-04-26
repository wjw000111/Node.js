function sum(a, b, cb) {
    setTimeout(() => { cb(a + b) }, 1000)
    // cb(a+b)
    // return a+b
}
// sum(123, 456, function (result) {
//     console.log(result);
// })

/*
    异步调用必须通过回调函数来返回数据，当我们进行一些复杂的调用时，会出现回调地狱。
    问题：
        异步必须通过回调函数来返回结果，回调函数一多就很痛苦
    Promise:
        -Promise 帮助我们解决异步中的回调函数问题    
        -Promise 就是一个存储数据的容器，他拥有一套特殊的存储数据的方式，这个方式使得他里面可以存储异步调用的结果
 */

// 创建promise
// 创建promise 时，构造函数中需要一个函数作为参数
// Promise 构造函数的回调函数，它会在创建promise时调用回调函数，调用时会有两个参数传递进去
const promise = new Promise((resolve, reject) => {
    // resolve 和 reject 是两个函数，通过这两个函数可以向Promise 中存储数据
    // resolve 在执行正常时存储数据，reject在执行错误时存储数据
    // console.log("回调函执行了");
    // resolve("哈哈")
    // reject("呵呵")

    // 通过函数向Promise 中添加数据，好处就是可以用来添加异步调用的数据
    // setTimeout(()=>{
    //     resolve("哈哈")
    // },2000)

    // throw new Error("哈哈，出错了")

    // resolve("resolve返回的数据")
    // reject("reject返回的数据")
 })

//  上面的promise中在两秒后才会执行，所以promise中在秒后才会存储数据,直接打印promise会是undefined
//  setTimeout(()=>{
//     console.log(promise);
//  },3000)

/*
    从promise中读取数据
        -可以通过Promise的实例方法then 来读取promise中存储的数据 
        -then需要两个回调函数作为参数，回调函数用来获取Promise中的数据
            通过resolve存储的数据，会调用第一个函数返回，可以通过第一个函数中编写处理数据的代码
            通过reject存储的数据或出现异常时，会通过第二个函数返回,可以在第二个函数中编写处理异常的代码
 */
// promise.then((result)=>{
//     console.log("promise中的数据",result);
// },(reason)=>{
//     console.log("数据",reason);
// })

/*
    Promise 中维护了两个隐藏属性：
        PromiseResult
            -用来存储数据

        PromiseState
            -记录promise的状态(三种状态)
                fulfilled(完成),通过resolve存储数据时
                reject(拒绝,出错了)，出错了或通过reject存储数据时
                pending(进行中)
            -state只能修改一次，修改后永远不会再变
        流程：
            当Promise创建时，PromsieState初始值为pending,
                当通过resolve存储数据时，PromiseState 变为fulfilled(完成)
                    PromiseResult变为存储的数据
                当通过reject存储数据或出错时，Promise变为rejected(j拒绝，出错了)
                    PromiseResult变为存储的数据或异常对象
            当我们通过通过then读取数据，相当于Promise设置了回调函数，
                如果PromiseState变为fulfilled，则调用then的第一个回调函数来返回数据,
                如果PromiseState变为reject,则调用then的第二个回调函数来返回数据
 */
const promise2=new Promise((resolve,reject)=>{
    // resolve("哈哈")
    reject("哈哈")
    // setTimeout(()=>{
    //     resolve("呵呵")
    // },2000)
})

// promise2.then((result)=>{
//     console.log(result);
// },(reason)=>{
//     console.log(reason);
// })

/*
    catch()用法和then类似，但是只需要一个回调函数作为参数
        catch()中的回调函数只会在Promise被拒绝时才调用
        catch()相当于then(null,(reason)=>{})
        catch()就是专门处理promise异常的方法
    finally()
        -无论是正常存储数据或出现异常，都会执行
        -但是finally 的回调函数 中不会接受任何数据
        -finally通常用来编写一些无论如何都要执行的代码
 */
promise2.catch((reason)=>{
    console.log(reason);
})
promise2.finally(()=>{
    console.log("谁也拦不住我`");
})

// 主进程的先执行   
console.log(111);