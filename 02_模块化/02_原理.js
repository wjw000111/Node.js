module
exports
require
/*
    素有的CommonJS模块都会包装到一个函数中，
    (function(exports,require,module,__filename,__dirname){})
 */
// (function(exports,require,module,_filename,__dirname){
//     let a=10
//     let b=20
// });
let a=10
let b=20
console.log(arguments);
console.log(__filename); //当前文件的绝对路径
console.log(__dirname);  //当前模块所在目录的路径