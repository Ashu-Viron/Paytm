const express=require("express");
const zod=require("zod");
const { User, Account } = require("../db");
const jwt=require('jsonwebtoken');
const { authMiddleware } = require("../middleware");
require('dotenv').config();
const jwt_secret=process.env.JWT_SECRET
const router=express.Router();

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string()
})
router.post("/signup",async (req,res)=>{
    const body=req.body;
    const {success}=signupSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message:"Incorrect inputs"
        })
    }
    const user=await User.findOne({
        username:body.username
    })
    if(user){
        return res.json({
            message:"Email already taken"
        })
    }
    const dbUser=await User.create(body);
    const token=jwt.sign({
        userId:dbUser._id
    },jwt_secret)
    res.json({
        message:"User created successfully",
        token:token
    })
    const userId=dbUser._id;
    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })
    
})

const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
})

router.post('/signin',async (req,res)=>{
    const body=req.body;
    const {success}=signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message:"wrong input"
        })
    }
    const user=await User.findOne({
        username:body.username
    })
    if(!user){
        return res.status(403).json({
            message:"Not find any User with this Email"
        })
    }
    const result=body.password.localeCompare(user.password);
    if(result!=0){
        return res.status(401).json({
            message:"wrong credentials"
        })
    }
    const token=jwt.sign({
        userId:user._id
    },jwt_secret);
    
        return res.json({token:token});

})

const updateSchema=zod.object({
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string()
})
router.put('/',authMiddleware,async (req,res)=>{
 const body=req.body;
 const {success}=updateSchema.safeParse(body);
 if(!success){
    return res.status(411).json({
        message:"Wrong Input"
    })
 }
await User.updateOne({
    _id:req.userId
},body)

return res.json({
    message:"Updated successfully"
})


})

router.get('/bulk',async (req,res)=>{
    const filter=req.query.filter||"";
    const users=await User.find({
        $or:[
            {firstName:{"$regex":filter}},
            {lastName:{"$regex":filter}}
        ]
    })
    return res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})
module.exports=router;