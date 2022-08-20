const express=require("express");
const userController=require("../controllers/userControllers");
const router=express.Router();


router.get("/products",userController.getproducts);
router.get("/products/:id",userController.productscat);
router.get("/buy",userController.getbuy);

router.get("/logintobuy",userController.getlogintobuy);
router.get("/signuptobuy",userController.getsignuptobuy);
router.post("/tobuy",userController.tobuy);

router.post("/logintobuy",userController.postlogintobuy);
router.post("/signuptobuy",userController.postsignuptobuy);   
router.get("/afterbuy",userController.afterbuy);

module.exports=router;