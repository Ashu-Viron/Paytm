const express=require('express')
const { authMiddleware } = require('../middleware')
const { Account } = require('../db')
const { default: mongoose } = require('mongoose')
const router=express.Router()

router.get('/balance',authMiddleware,async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    return res.json({
        balance:account.balance
    })
})
router.post('/transfer',authMiddleware,async (req,res)=>{
    //bad solution////////////////

//     const {amount,to}=req.body;
//     const account=await Account.findOne({
//         userId:req.userId
//     })
//     if(account.balance<amount){
//         return res.status(400).json({
//             message:"Account doesnot have sufficient balance"
//         })
//     }
//     const toAccount=await Account.findOne({
//         userId:to
//     })
//     if(!toAccount){
//         res.status(400).json({
//             message:"Invalid Account"
//         })
//     }
//     await Account.updateOne({
//         userId:req.userId},
//         {$inc:{
//             balance:-amount
//         }
//     })

//     await Account.updateOne({
//         userId:to},
//         {$inc:{
//             balance:amount
//         }
// })
// res.json({
//     message:"Transfer successful"
// })

//good solution///////////////
const session=await mongoose.startSession();
session.startTransaction();
const {amount,to}=req.body;
if (to === req.userId) {
    await session.abortTransaction();
    return res.json({ message: "Cannot Transfer to yourself!" });
  }
const account=await Account.findOne({
    userId:req.userId
}).session(session)
if(!account||account.balance<amount){
    await session.abortTransaction();
    return res.status(400).json({
        message:"Insufficient Balance"
    })
}

const toAccount=await Account.findOne({
    userId:to
}).session(session)
if(!toAccount){
    await session.abortTransaction();
    return res.status(400).json({
        message:"Invalid account"
    })
}

//perform trasfer
await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

//commit the transaction
await session.commitTransaction();
 return res.json({
    message:"Transaction Successful"
});

})
module.exports=router
