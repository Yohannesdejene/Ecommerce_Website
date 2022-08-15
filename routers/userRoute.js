const express=require("express");


const bcrypt=require("bcrypt")
const {sequelize}=require("../models");
const jwt= require("jsonwebtoken");


const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})
const router=express.Router();




 
router.get("/home",(req,res)=>{
res.render("home");
})

router.get("/products",(req,res)=>{
   sequelize.models.product.findAll({ 
   }).then((data)=>{
   console.log(data);
  res.render("products",{datas:data});
   }).catch((err)=>{
       console.log(err)
   });
    
  
})


router.get("/signup",(req,res)=>{
res.render("signup",{message:""});

})

router.get("/login",(req,res)=>{
   res.render("login",{message :""});
})


router.get("/profile",(req,res)=>{
sequelize.models.user.findAll({
   where:{userType:"admin"}
}).then((data)=>{
console.log(data);
 res.render("profile",{datas:data});
// res.send(data);
}).catch((err)=>{
   console.log(err);
})

});

router.get("/buy",async(req,res)=>{
const name=req.query.name;
const price=req.query.price;
const picture=req.query.picture;
const data= await sequelize.models.product.findOne({where:{name:name}})
console.log(name);
console.log(price);
console.log(picture);

res.render("buy",{data:data});
})

router.get("/logintobuy",(req,res)=>{

res.render("logintobuy",{message:""})
});
router.get("/signuptobuy",(req,res)=>{
res.render("signuptobuy",{message:""});
})

router.post("/tobuy",async(req,res)=>{
  
const name=req.query.name;
const price=req.query.price;
const picture=req.query.picture;
console.log(name);
console.log(price);
console.log(picture);
 const token = req.cookies.token;
   if (token) {
      const data = jwt.verify(token, mysecret);
      const email= data.email;
     const productdata=await sequelize.models.product.findOne({where:{name:name}&&{picture:picture}});
     const productId=productdata.id;
     sequelize.models.purchased.create({
     time:Date.now(),
     productId: productId,
     userEmail:email,
     }).then(data=>{
   console.log("data sent");
      return res.render("afterbuy");
     }).catch(err=>{
        console.log("error");
     });
     
   }
   else{
    res.render("logintobuy",{message:""})
   }
 

    

    

})



const mysecret=process.env.SECRET;
router.post("/logintobuy",async(req,res)=>{
   const email=req.body.email;
   const password=req.body.password;
   
   const name=req.query.name;
   const price=req.query.price;
   const picture=req.query.picture;
   
      const existemail=await sequelize.models.user.findOne({ where: { email: email } });
   if(existemail){
      const data =await sequelize.models.user.findOne({where:{email:email}});
      bcrypt.compare(req.body.password, data.password, async function(err, result) {
         if (result) {
            // password is valid
       
               const token = jwt.sign({ email:data.email, utype:data.userType }, mysecret);

              
  
          const productdata=await sequelize.models.product.findOne({where:{name:name}&&{picture:picture}});
                   const productId=productdata.id;
                   sequelize.models.purchased.create({
                   time:Date.now(),
                   productId: productId,
                   userEmail:existemail,
                   }).then(data=>{
                 console.log("data sent");
                    return res.cookie("token", token, {
                     httpOnly: true,
                   maxAge:1000*60*60*24,
                     Secure:true,}).render("afterbuy");
                   }).catch(err=>{
                      console.log("error");
                   });
     


                
           //res.render("adminHome",{data:data})
        
        }else{
         res.render("logintobuy",{message:"PASSWORD DON'T MATCH"});
        }
     })
   }
   else{
      res.render("logintobuy",{message:"EMAIL DONT EXIST"})
   
   
   }
   })

   router.post("/signuptobuy",async(req,res)=>{
     
      console.log(req.body.fname);
   console.log(req.body.email);
   console.log(req.body);
    
      const Fname=req.body.fname;
      const Lname=req.body.lname;
      const email=req.body.email;
      const password=req.body.password;
      const address=req.body.address;
      
   
   const existemail=await sequelize.models.user.findOne({ where: { email: email } });
   if(existemail){
   
      res.render("signuptobuy",{message:"This email already exist try another"});
   }
   else if(req.body.password!=req.body.passwordConfirm){
   
      res.render("signuptobuy",{message:"Password Mismatch"});
   
   }
   else {
     const hashedpassword=await bcrypt.hash(password,10);



     if (!req.files)
               return res.status(400).send('No files were uploaded.');
       var file = req.files.profilephoto;
       var img_name=file.name;
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                               
             file.mv('public/images/upload_images/'+file.name, function(err) {
                           
                 if (err)
                   return res.status(500).send(err);
                   sequelize.models.user.create({
                    Fname:Fname,Lname:Lname,email:email,password:hashedpassword,address:address,profilePhoto:img_name,userType:"admin"
              
                       }).then(async (data)=>{
            
              res.render("logintobuy",{message:"LOGIN TO BUY THE PRODUCT"});
             console.log("data sent");
          
                       }).catch((err)=>{
                    console.log(err);
                       });
              
                      });
         } else {
           message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
           // res.render('index.ejs',{message: message});
           res.render("signuptobuy",{message:message})
         }
  } 
  
      
     
  });



   
router.get("/afterbuy",(req,res)=>{

   res.render("afterbuy");
   })


router.get("/add",(req,res)=>{
    res.send("user  add");
})



module.exports=router;