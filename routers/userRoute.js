const express=require("express");

const path=require("path");
const bcrypt=require("bcrypt")
const multer = require('multer')
const {sequelize}=require("../models");
const router=express.Router();




 
router.get("/",(req,res)=>{
res.send("nothing is adde");
})
router.get("/products",(req,res)=>{
   sequelize.models.user.findAll({ 
   }).then((data)=>{
   console.log(data);
  res.render("products",{datas:data});
   }).catch((err)=>{
       console.log(err)
   });


    
  
})


router.get("/get",(req,res)=>{
sequelize.models.user.findAll({ 
}).then((data)=>{
console.log(data);
res.send(data);
}).catch((err)=>{
    console.log(err)
});


})


router.get("/signup",(req,res)=>{
res.render("signup",{message:""});

})
const upload = multer({ storage:multer.memoryStorage() });

router.post("/signup",upload.single('profilephoto'),async(req,res)=>{
   console.log(req.body.profilephoto);
   console.log(req.body);

 
   const Fname=req.body.Fname;
   const Lname=req.body.Lname;
   const email=req.body.email;
   const password=req.body.password;
   const address=req.body.address;
   let image;
   if(req.file){
 image=req.file.buffer.toString("base64");
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
  
      sequelize.models.user.create({
         Fname:Fname,Lname:Lname,email:email,password:hashedpassword,address:address,profilePhoto:image,userType:"admin"
         
            }).then(async (data)=>{
   
   //       const datan=await sequelize.models.user.findOne({ where: { email: email } });
   //   res.render("profile",{title:"profile",profiledata:datan});
   res.send("data inserted succesufully");
            }).catch((err)=>{
         console.log(err);
            });
         

   


     
}


})

router.post("/login",(req,res)=>{
   res.render("login");
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

router.get("/buy",(req,res)=>{

})

router.get("/add",(req,res)=>{
    res.send("user  add");
})



module.exports=router;