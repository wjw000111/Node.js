/*
    package.json
        -package.json是包的描述文件
        -node中通过该文件对项目进行描述
        -每一个node项目必须有package.json,可以在终端通过npm init初始化，npm init -y全部默认，
    
    命令：
        npm init 初始化项目，创建package.json文件（需要回答问题）
        npm init -y 初始化项目，创建package.json文件，（所有值都采用默认值）
        npm install 包名  将指定包下载到当前项目中    
            install时发生了什么：
                1.将包下载到当前项目的node_modules目录下
                2.会在package.json的dependencies属性中添加一个新属性，："lodash": "^4.17.21"  ^表示匹配4.xxx的最新版本，~表示匹配4.17.xx的最新版本, *表示匹配最新版本
                3.会自动添加package-lock.json文件,帮助加速npm下载，不用动

        npm install 自动安装依赖
        npm install 包名 -g 全局安装
            -全局安装是将包安装在计算机中，全局安装的通常是一些工具
        
        npm uninstall 包名 卸载
 */

/*
    引入npm下载的包时，不需要书写路径，直接写包名即可
 */
const _=require("lodash")
console.log(_);