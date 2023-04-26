const fs=require("node:fs/promises")
const path=require("node:path")
/*
    mkdir可以接受一个配置对象作为第二个参数  
        通过该对象可以对方法的功能进行配置
            recursive 默认值为false
                -设置true后，会自动创建不存在的上一级目录    
 */
// fs.mkdir(path.resolve(__dirname,"./hello/abc"),{recursive:true}).then(r=>{console.log("操作成功");}).catch(err=>{console.log("创建失败",err);})

// fs.rmdir(path.resolve(__dirname,"./hello"),{recursive:true}).then(r=>{console.log("删除成功");}).catch(err=>{console.log("删除失败",err);})

fs.rename(path.resolve(__dirname,"../an.jpeg"),path.resolve(__dirname,"./an.jpeg")).then(r=>{console.log("重命名成功");})