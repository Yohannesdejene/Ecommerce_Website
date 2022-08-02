const jwt= require("jsonwebtoken");
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})

const mysecret=process.env.SECRET;
exports.authorization = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.render("login",{message:"message to login again"});
    }
    try {
      const data = jwt.verify(token, mysecret);
      req.email = data.email;
      req.uType = data.uType;
      console.log("data is found in the token");
      console.log(data.email);
    
      return next();
    } catch {
      return res.sendStatus(403);
    }
  };
 