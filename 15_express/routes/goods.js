const express=require("express")

// 创建一个router对象
const router=express.Router()
router.get('/goods',(req,res)=>{
    res.send("hello,我是goods")
})
// 将router暴露到模块外
module.exports=router