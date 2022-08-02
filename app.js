const express=require("express");
const bp = require('body-parser');
const cookieParser = require("cookie-parser");
const userRoute=require("./routers/userRoute");
const adminRoute=require("./routers/adminRoute");
const homeRoute=require("./routers/homeRoute");
const {sequelize}=require("./models");
const path= require("path");


const fileupload=require("express-fileupload");

const app=express();

app.use(cookieParser());


app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.set("view engine","ejs");
const publicdirectory=path.join(__dirname,"./public"); 
app.use(express.static(publicdirectory));


app.use(fileupload());

app.use("/admin",adminRoute);
app.use("/user",userRoute);
app.use("/home",homeRoute);

async function fun(){
 await sequelize.sync({ alter: true });
}fun();
 app.listen(3000,(erer,result)=>{

     console.log("connecting to ort 2000....");
 })