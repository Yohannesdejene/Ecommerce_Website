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



router.get("/signup",(req,res)=>{
   res.render("signup",{message:"ohhhhhhhh"});
})
router.get("/new",async (req,res)=>{
   const data =await sequelize.models.user.findOne({where:{email:"yohannesdejene23@gmail.com"}});
console.log(data);
console.log(data.email)
console.log(data.Fname);
res.send(data);
})
router.get("/signup",(req,res)=>{
   res.render("signup",{message:"ohhhhhhhh"});
})
router.get("/login",(req,res)=>{
res.render("login",{message:""});
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
       res.render("home",{message:"logged in succesufully"})     
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



    const upload = multer({ storage:multer.memoryStorage() });
    
    router.post("/signup",async(req,res)=>{
     
       console.log(req.body.fname);
    console.log(req.body.email);
    console.log(req.body);
     
       const Fname=req.body.fname;
       const Lname=req.body.lname;
       const email=req.body.email;
       const password=req.body.password;
       const address=req.body.address;
       let image;
       if(req.file){
     image=req.file.buffer.toString("base64");
     console.log("yes thre is file");
       }
    
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
                     Fname:Fname,Lname:Lname,email:email,password:hashedpassword,address:address,profilePhoto:img_name,userType:"admin"
               
                        }).then(async (data)=>{
               
                 //     const datan=await sequelize.models.user.findOne({ where: { email: email } });
                 // //res.render("profile",{title:"profile",profiledata:datan});
                 // res.render("login");
               res.render("signup",{message:"register to the system"});
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
   
       
      
    })


const maxAge=1*24*60*60;
const generateToken=(email)=>{
return jwt.sign({email},"mysecret",{
expiresIn:maxAge
})
};

router.get("/login",(req,res)=>{
    res.render("login",{verify:"hdhdhdh"});
})
router.post("/login",async(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;
 const data= await sequelize.models.user.findOne({
where:{email:email}
 });
 if(data){

    bcrypt.compare(req.body.password, data.password, function(err, result) {
        if (err){
          // handle error
          console.log("err in bcrypt ")
        }
        if (result){
          // Send JWT
const token=generateToken(data.email)
res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000});
res.status(201).send("logges in");

        } else {
          // response is OutgoingMessage object that server response http request
         
         return res.render("login",{verify:"passwordMistmatch"})

        }
      })

 }
 else{
     res.render("login",{verify:"User Not Found"});
 }


})

module.exports=router;