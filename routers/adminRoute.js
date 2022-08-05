const express=require("express");
const authController=require("../controllers/authControllers");
const router=express.Router();





router.get("/home",(req,res)=>{

    res.render("adminHome");
})
authController.authorization
router.get("/addProduct",(req,res)=>{

    res.render("addProduct");
})
//authController.authorization
router.get("/soldProduct",(req,res)=>{
res.render("soldProduct");
})





module.exports=router