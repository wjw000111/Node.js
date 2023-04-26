/*
    ES模块化
 */
// 向外部导出内容
export let a=10
export const b="孙悟空"
export const c={name:"猪八戒"}
console.log("哈哈");

// 设置默认导出,一个模块中只有一个默认导出
// export default function sum(a,b){
//     return a+b
// }

// default后面必须是值
// export default let d=20  //报错
let d
export default d=20