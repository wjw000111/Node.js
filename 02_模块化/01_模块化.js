/*
    早期的网页中，是没有一个实质的模块规范的
        我们实现模块化的方式，就是最原始的通过script标签来引入多个js文件
        问题：
            1.无法选择要引入模块的哪些内容
            2.在复杂的模块场景下非常容易出错
            ......
        于是我们急需在js中引入一个模块化的解决方案
    
    在node中，默认支持的模块化规范叫做CommonJS,在commonJS中，一个JS文件就是一个模块

    CommonJS规范
        -引入模块
            -使用require()函数来引入模块
            -引入自定义模块时，
                -模块以./, ../开头，相对路径       
                -扩展名可以省略
                    -在CommonJS中，如果省略了js的扩展名，node会自动为文件补全扩展名,当有同名文件，先找js文件，如果没有该js文件，会寻找对应的json文件(扩展名查找顺序：js,json,node(特殊))
            -引入核心模块时：
                -直接写核心模块的名字即可
                -也可以在核心模块前添加node:
 */
const m1 = require("./m1")
const m2=require("./m2")

// const path=require("path")
const path=require("node:path")  //指明他是一个核心模块，查找速度更快些
console.log("path模块",path);
console.log(m1);
console.log(m2);
console.log(m1.b); 
m1.c()  

const m_2=require("./m2.cjs")  //此时必须写扩展名
const hello=require("./hello")  //引入hello文件夹，里面需要有index文件,默认引入hello/index.js
