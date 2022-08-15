const express=require("express");
const authController=require("../controllers/authControllers");
const adminController=require("../controllers/adminControllers");
const {sequelize}=require("../models");
const router=express.Router();





router.get("/home",(req,res)=>{
res.render("adminHome");
})


router.get("/addProduct",authController.authorization,adminController.adminauthorization,(req,res)=>{

    res.render("addProduct");
})
router.post("/addProduct",authController.authorization,adminController.adminauthorization,async(req,res)=>{


 const name=req.body.name;
 const oldprice=req.body.oldprice;
 const newprice=req.body.newprice;
const description=req.body.description;
const gender=req.body.gender;
const category=req.body.category;
console.log(category);
const mycategory=await sequelize.models.category.findOne({where:{Cname:category}});
console.log(req.files);
          if (!req.files)
          return res.status(400).send('No files were uploaded.');
  var file = req.files.picture;
  var img_name=file.name;
   if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                          
        file.mv('public/images/product_image/'+file.name, function(err) {
        
            if (err)
              return res.status(500).send(err);
              sequelize.models.product.create({
               name:name,oldprice:oldprice,newprice:newprice,description:description,gender:gender,picture:img_name,categoryId:mycategory.id
         
                  }).then(async(data)=>{
    const products=await sequelize.models.product.findAll();
 res.render("products",{datas:products});
    }).catch((err)=>{

        console.log(err);
        res.send("data not sent");
           });
  
          });


}})
//authController.authorization
router.get("/soldProduct",authController.authorization,adminController.adminauthorization,(req,res)=>{
res.render("soldProduct");
})



module.exports=router