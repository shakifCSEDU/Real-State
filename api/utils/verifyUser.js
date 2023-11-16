const errorHanlder = require("./error");
const jwt = require('jsonwebtoken');


const verifyToken = (req,res,next)=>{

    console.log('Called!!');
  const token = req.cookies.access_token;
  
  if(!token)return next(errorHanlder(401,'Unauthorized'));
  
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err) return next(errorHanlder(403,'Forbidden'));
    req.user = user;
    next();
  });
}
module.exports = {verifyToken};