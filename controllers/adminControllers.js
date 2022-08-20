const {sequelize}=require("../models");
const jwt= require("jsonwebtoken");
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})
const mysecret=process.env.SECRET;
exports.adminauthorization = (req, res, next) => {
    const token = req.cookies.token;
      const data = jwt.verify(token, mysecret);
      req.email = data.email;
      req.uType = data.utype;
      console.log(data.utype);
      console.log(data);
 
     if(data.utype=="admin")
    {
      return next();
    }
    else {
return res.render("login",{message:"NOT AUTHORISED LOGIN AGAIN"});
    }
  };
const getaddproduct=(req,res)=>{
    return res.render("addProduct");
  };
const postaddproduct=async(req,res)=>{
    
 const name=req.body.name;
 const oldprice=req.body.oldprice;
 const newprice=req.body.newprice;
const description=req.body.description;
const gender=req.body.gender;
const category=req.body.category;
const quantity=req.body.quantity;
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
               name:name,oldprice:oldprice,newprice:newprice,description:description,gender:gender,picture:img_name,categoryId:mycategory.id,quantity:quantity
         
                  }).then((data)=>{
    sequelize.models.product.findAll({
        
    }).then(data=>{
        console.log("data sent");
        res.render("products",{datas:data});
    }).catch(err=>{
        conso.log(err);
    })
 
    }).catch((err)=>{

        console.log(err);
        res.send("data not sent");
           });
  
          });


}}
const getadminHome=async(req,res)=>{
    const token = req.cookies.token;
    const datas = jwt.verify(token, mysecret);
 const data= await sequelize.models.user.findOne({
    where:{email:datas.email}
 })
res.render("adminHome",{data:data});
}
const soldproduct=(req,res)=>{
  sequelize.models.purchased.findAll({
  include:{
      model:sequelize.models.user,
      include:{
      model:sequelize.models.product,
      },
  },
  
  }).then(data=>{
      //data[0].user.email
  console.log(data[0].user.products[0].id);
  //console.log(data[0].user);
  //res.status(201).send(data[0].user.products[0].id+"");
  res.render("soldProducts",{data:data})
  }).catch(err=>{
      console.log(err);
  })
  
  }
  module.exports.getaddproduct=getaddproduct;
  module.exports.postaddproduct=postaddproduct;
  module.exports.getadminHome=getadminHome;
  module.exports.soldproduct=soldproduct;

 