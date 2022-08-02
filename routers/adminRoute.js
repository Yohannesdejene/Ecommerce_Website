const express=require("express");
const authController=require("../controllers/authControllers");
const router=express.Router();





router.get("/home",(req,res)=>{

    res.render("adminHome" );
})
authController.authorization
router.get("/addProduct",(req,res)=>{

    res.render("products");
})
router.get("/soldProduct",authController.authorization,(req,res)=>{
res.render("soldPr")
})





module.exports=router