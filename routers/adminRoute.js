const express=require("express");
const authController=require("../controllers/authControllers");
const adminController=require("../controllers/adminControllers");
const router=express.Router();


router.get("/adminHome",authController.authorization,adminController.adminauthorization,adminController.getadminHome);

router.get("/addProduct",authController.authorization,adminController.adminauthorization,adminController.getaddproduct);
router.post("/addProduct",authController.authorization,adminController.adminauthorization,adminController.postaddproduct);

router.get("/soldProducts",authController.authorization,adminController.adminauthorization,adminController.soldproduct);




module.exports=router