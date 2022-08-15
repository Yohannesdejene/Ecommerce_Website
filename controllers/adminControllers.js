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
 