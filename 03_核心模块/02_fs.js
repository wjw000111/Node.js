const fs=require('node:fs/promises')
const path=require("node:path")
 /*
    fs.readFile() 读取文件
    fs.appendFile() 创建新文件，或将数据读取到已有文件中
    fs.mkdir() 创建目录
    fs.rmdir() 删除目录
    fs.rename() 重命名(剪切)
    fs.copyFile() 复制文件（复制）
  */



// fs.appendFile(path.resolve(__dirname,'./hello123.txt'),"超哥讲的真不错!").then(r=>{
//     console.log(r);
//     console.log("添加成功");
// })


// 复制一个文件
// C:\Users\15275\Desktop\充电站论文\DQN.jpeg
fs.readFile("C:\\Users\\15275\\Desktop\\充电站论文\\DQN.jpeg").then(buffer=>
    fs.appendFile(path.resolve(__dirname,'./haha.jpeg'),buffer)
).then(()=>{console.log("操作完毕");})