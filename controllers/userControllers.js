const bcrypt=require("bcrypt")
const {sequelize}=require("../models");
const jwt= require("jsonwebtoken");
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})
const mysecret=process.env.SECRET;

const getproducts=(req,res)=>{

    sequelize.models.product.findAll({ 
    }).then((data)=>{
    console.log(data);
   res.render("products",{datas:data});
    }).catch((err)=>{
        console.log(err)
    });
 
 }
 const productscat=(req,res)=>{
    const id=req.params.id;
    if(id==1){
  
     
     sequelize.models.product.findAll({ 
        where:{categoryId:1},
        }).then((data)=>{
        console.log(data);
       res.render("products",{datas:data});
        }).catch((err)=>{
            console.log(err)
        });
    }
    else if(id==2){
     sequelize.models.product.findAll({ 
        where:{categoryId:2},
        }).then((data)=>{
        console.log(data);
       res.render("products",{datas:data});
        }).catch((err)=>{
            console.log(err)
        });
         
    }
    else if(id==3){
  
     
     sequelize.models.product.findAll({ 
        where:{categoryId:3},
        }).then((data)=>{
        console.log(data);
       res.render("products",{datas:data});
        }).catch((err)=>{
            console.log(err)
        });
    }
    
    else if(id==4){
  
     
     sequelize.models.product.findAll({ 
        where:{categoryId:4},
        }).then((data)=>{
        console.log(data);
       res.render("products",{datas:data});
        }).catch((err)=>{
            console.log(err)
        });
    }
    else if(id==10){
     sequelize.models.product.findAll({ 
        where:{gender:"MALE"},
        }).then((data)=>{
        console.log(data);
       res.render("products",{datas:data});
        }).catch((err)=>{
            console.log(err)
        });
    }
    else if(id==20){
     sequelize.models.product.findAll({ 
        where:{gender:"FEMALE"},
        }).then((data)=>{
        console.log(data);
       res.render("products",{datas:data});
        }).catch((err)=>{
            console.log(err)
        });
    }
     
  else {
  
      sequelize.models.product.findAll({ 
     }).then((data)=>{
     console.log(data);
    res.render("products",{datas:data});
     }).catch((err)=>{
         console.log(err)
     });
  }
}
  const getbuy=async(req,res)=>{
    const name=req.query.name;
    const price=req.query.price;
    const picture=req.query.picture;
    const data= await sequelize.models.product.findOne({where:{name:name}})
    console.log(name);
    console.log(price);
    console.log(picture);
    
    res.render("buy",{data:data});
}
const getlogintobuy=(req,res)=>{
res.render("logintobuy",{message:""})
}
const getsignuptobuy=(req,res)=>{
    res.render("signuptobuy",{message:""});
}
const tobuy=async(req,res)=>{
    console.log("in b=tobuy page")
  const name=req.query.name;
  const price=req.query.price;
  const picture=req.query.picture;
  
  res.cookie("name", name, {
        httpOnly: true,
        Secure:true,
     });
  res.cookie("picture",picture,{
     httpOnly: true,
       Secure:true,
  });
  res.cookie("price",price,{
     httpOnly: true, 
       Secure:true,
  });
  
  
   const token = req.cookies.token;
     if (token) {
        const data = jwt.verify(token, mysecret);
        const email= data.email;
      
       const productdata=await sequelize.models.product.findOne({where:{name:name}&&{picture:picture}});
       const productId=productdata.id;
       const quantity=req.cookies.quantity;
      
      const x=productdata.quantity-quantity;
      console.log("qauntity from cookie",quantity)
      console.log(x);
       sequelize.models.purchased.create({
       time:Date.now(),
       productId: productId,
       userEmail:email,
       quantity:quantity,
       }).then(data=>{
  
      sequelize.models.product.update({ name:productdata.name,oldprice:productdata.oldprice,newprice:productdata.newprice,description:productdata.description,gender:productdata.gender,picture:productdata.picture,categoryId:productdata.categoryId,quantity:x }, {
           where: {
             id:productdata.id, 
           }
         }).then(data=>{
           console.log("updated");
         }).catch(err=>{
           console.log(err);
         })
     console.log("data sent");
        return res.render("afterbuy");
       }).catch(err=>{
          console.log("error");
          console.log(err);
       });
       
     }
     else{
      res.render("logintobuy",{message:""})
     }
   
  
      
  
      
  
  }

const postlogintobuy=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    
    const name = req.cookies.name;
    const picture = req.cookies.picture;
    const price= req.cookies.price;
    console.log("name",name);
    console.log("picture",picture);
    console.log("price",price);
    
   
       const existemail=await sequelize.models.user.findOne({ where: { email: email } });
    if(existemail){
       const data =await sequelize.models.user.findOne({where:{email:email}});
       bcrypt.compare(req.body.password, data.password, async function(err, result) {
          if (result) {
             // password is valid
        
                const token = jwt.sign({ email:data.email, utype:data.userType }, mysecret);
 
                res.cookie("token", token, {
                   httpOnly: true,
                 maxAge:1000*60*60*24,
                   Secure:true});
               
   
           const productdata=await sequelize.models.product.findOne({where:{name:name}&&{picture:picture}});
           console.log(productdata);
           console.log("product id",productdata.id)
           if(productdata){
                    const productId=productdata.id;
                    sequelize.models.purchased.create({
                    time:Date.now(),
                    productId:productId,
                    userEmail:data.email,
                   
                    }).then((data)=>{
                  console.log("data sent");
            res.cookie('name','price','picture', {
 
             maxAge: 0,
             overwrite: true,
           });
                      return res.render("afterbuy");
                     })
                   .catch(err=>{
                       console.log("error");
                       console.log(err);
                    });
                   }else{
                   res.send("no product data");
                   }
 
 
                 
            //res.render("adminHome",{data:data})
         
         }else{
          res.render("logintobuy",{message:"PASSWORD DON'T MATCH"});
         }
      })
    }
    else{
       res.render("logintobuy",{message:"EMAIL DONT EXIST"})
    
    
    }
}
 
  
const postsignuptobuy=async(req,res)=>{
     
    console.log(req.body.fname);
 console.log(req.body.email);
 console.log(req.body);
  
    const Fname=req.body.fname;
    const Lname=req.body.lname;
    const email=req.body.email;
    const password=req.body.password;
    const address=req.body.address;
    const gender=req.body.gender;
    const creditcard=req.body.creditcard;
 
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
                  Fname:Fname,Lname:Lname,email:email,password:hashedpassword,gender:gender,address:address,profilePhoto:img_name,userType:"user",creditcardNo:creditcard
            
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

    
   
}

const afterbuy=(req,res)=>{
res.render("afterbuy");
}
 

  
module.exports.getproducts=getproducts;
module.exports.productscat=productscat;
module.exports.getbuy=getbuy;
module.exports.getlogintobuy=getlogintobuy;
module.exports.getsignuptobuy=getsignuptobuy;
module.exports.tobuy=tobuy;
module.exports.postlogintobuy=postlogintobuy;
module.exports.postsignuptobuy=postsignuptobuy;
module.exports.afterbuy=afterbuy;





