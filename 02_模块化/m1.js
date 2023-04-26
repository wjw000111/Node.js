let a=10
let b=20
console.log("我是m1模块");
/*
    在定义模块时，模块中的内容默认是不能被外部看到的
        可以通过exports 来设置要向外暴露的内容
    访问exports的方式有两种：
        exports
        module.exports
        -当我们在其他模块中引入当前模块，require函数返回的就是exports对象
        -我们可以将希望暴露给外部模块的内容设置为exports属性
 */
// console.log(exports);
// console.log(module.exports);
console.log(exports===module.exports);


// 可以通过exports一个个的导出值
exports.a="孙悟空"
console.log(exports);
console.log(module.exports);
// exports.b={name:"白骨精"}
// exports.c=function fn(){
//     console.log("哈哈");
// }
// 也可以直接通过module.exports同时导出多个值
module.exports={   //本质是修改对象的属性，修改后，用到对象的其他地方也修改了
    a:"哈哈",
    b:[1,2,3,4],
    c:()=>{
        console.log(111);
    }
}

exports={  // 给exports重新赋值，原来为module对象中的属性exports(也是一个对象),，只会影响变量自己,对别的地方没有影响
    a:"哈哈",
    b:[1,2,3,4],
    c:()=>{
        console.log(111);
    }
}
