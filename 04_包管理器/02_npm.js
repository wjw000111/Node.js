/*
    package.json
        scripts:
            -可以自定义一些命令
            -定义以后可以直接通过npm来执行命令
            -start 和 test 可以直接通过 npm start , npm test执行
            -其他命令需要通过npm run xxx 执行
    
    npm镜像
        -npm仓库的服务器在国外，有的时候并不是那么好使
        -为了解决这个问题，我们可以在npm中配置镜像服务器
        -镜像网站：npmmirror.com, 
        -镜像的配置：
            1.在系统安装cnpm  (不太推荐)
                npm install -g cnpm --registry=https://registry.npmmirror.com
            2.彻底修改npm仓库地址(推荐)
                npm set registry https://rgistry.npmmirror.com
                -还原到原版仓库
                npm config delete  registry
                -查看当前仓库地址：
                npm config get registry
 */