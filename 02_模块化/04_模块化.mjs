/*
    默认情况下，node中的模块化标准是CommonJS
        要想使用ES的模块化，可以采用以下两种方案：
            1.使用mjs作为扩展名
            2.修改package.json将模块化规范设置为ES模块   
                当我们设置了"type":"module" 当前项目下所有的js文件都默认es module

 */
// 验证使用的是es6的模块化，看有没有module
// console.log(module);

// 导入m4模块，使用ES模块化 ,es模块不能省略扩展名，
// import "./m4.mjs"
// import {a as hello,b,c} from "./m4.mjs"  //通过as引入别名
// console.log(hello,b,c);\

// 开发时尽量避免import *
// import * as m4 from "./m4.mjs"  //把m4.mjs中所有东西导入并打包进m4
// console.log(m4);

// 导入模块的默认导出
// 默认导出的内容，可以随意命名
import theSum,{a,b,c} from "./m4.mjs"
console.log(theSum,a);

// 通过ES模块化导入的内容都是常量
// ES模块都是运行在严格模式下的
// ES模块化在浏览器中也支持，但是通常不会直接使用，考虑兼容性的问题,通常会结合打包工具使用   
console.log(a);
// a=20    //报错，给常量赋值
// 但可以改变量
c.name="沙和尚"
console.log(c);
