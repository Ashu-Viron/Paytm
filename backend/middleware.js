const jwt=require("jsonwebtoken");
require('dotenv').config();
const jwt_secret=process.env.JWT_SECRET

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith("Bearer ")){
        return res.status(403).json({});
    }
    const token=authHeader.split(" ")[1];
    try{
        const decoded=jwt.verify(token,jwt_secret);
        if(decoded.userId){
        req.userId=decoded.userId;
        next();
        }else{
            return res.status(403).json({ message: "Invalid auth header"});
        }
        
    }catch(e){
        return res.status(403).json({message: "Invalid auth header"});
    }
}

module.exports={
    authMiddleware
}