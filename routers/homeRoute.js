const express=require("express");

const bcrypt=require("bcrypt")
const multer = require('multer')
const {sequelize}=require("../models");
const jwt= require("jsonwebtoken");


const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})
const router=express.Router();




router.get("/login",(req,res)=>{
   res.render("login",{message:"hdhdhdh"});
})

const mysecret=process.env.SECRET;
router.post("/login",async(req,res)=>{
const email=req.body.email;
const password=req.body.password;

   const existemail=await sequelize.models.user.findOne({ where: { email: email } });
if(existemail){
   const data =await sequelize.models.user.findOne({where:{email:email}});
   bcrypt.compare(req.body.password, data.password, function(err, result) {
      if (result) {
         // password is valid
         if(data.userType=="admin"){
            const token = jwt.sign({ email:data.email, utype:data.userType }, mysecret);
         
            return res
              .cookie("token", token, {
                httpOnly: true,
              maxAge:1000*60*60*24,
                Secure:true,
            
              })
             .render("adminHome",{data:data});
             
        //res.render("adminHome",{data:data})
         }
         else{
    const token = jwt.sign({ email:data.email, utype:data.userType }, mysecret);
     return res
    .cookie("token", token, {
      httpOnly: true,
    maxAge:1000*60*60*24,
      Secure:true,
  
    })
   .render("products",{data:data});   
         }
     }else{
      res.render("login",{message:"PASSWORD DON'T MATCH"});
     }
  })
}
else{
   res.render("login",{message:"EMAIL DONT EXIST"})


}
})


router.get("/signup",(req,res)=>{
   res.render("signup",{message:"hdhdhdh"});
})

 router.post("/signup",async(req,res)=>{
     
       console.log(req.body.fname);
    console.log(req.body.email);
    console.log(req.body);
     
       const Fname=req.body.fname;
       const Lname=req.body.lname;
       const email=req.body.email;
       const password=req.body.password;
       const address=req.body.address;
       
       const creditcard=req.body.creditcard;
    const existemail=await sequelize.models.user.findOne({ where: { email: email } });
    if(existemail){
    
       res.render("signup",{message:"This email already exist try another"});
    }
    else if(req.body.password!=req.body.passwordConfirm){
    
       res.render("signup",{message:"Password Mismatch"});
    
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
                     Fname:Fname,Lname:Lname,email:email,password:hashedpassword,address:address,profilePhoto:img_name,userType:"user" ,creditcardNo:creditcard
               
                        }).then(async (data)=>{
                           sequelize.models.product.findAll({ 
                           }).then((data)=>{
                           console.log(data);
                          res.render("products",{datas:data});
                           }).catch((err)=>{
                               console.log(err)
                           });

               
              console.log("data sent");
           
                        }).catch((err)=>{
                     console.log(err);
                        });
               
                       });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            // res.render('index.ejs',{message: message});
            res.render("signup",{message:message})
          }
   } 
   
       
      
   });

   module.exports=router


