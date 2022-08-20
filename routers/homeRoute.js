const express=require("express");
const homeController=require("../controllers/homeControllers");
const router=express.Router();


router.get("/login",homeController.getlogin);
router.post("/login",homeController.postlogin);

router.get("/signup",homeController.getsignup);
router.post("/signup",homeController.postsignup);

module.exports=router


