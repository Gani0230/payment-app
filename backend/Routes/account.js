const express = require('express')
const { Account } = require('../db')
const authmiddleware = require('../middleware')
const { default: mongoose } = require('mongoose')

const router = express.Router()
router.get("/balance",authmiddleware ,async (req,res)=>{
    const current_acc = await Account.findOne({userId: req.userId})
    res.status(200).json({
        balance: current_acc.balance
    })
})

router.post("/transfer",authmiddleware,async (req,res)=>{
    const amount = Number(req.body.amount);
    const acc_id = req.body.to;

    const next_account = await Account.findOne({
        userId: acc_id
    })
    if(!next_account){
        return res.status(500).json({
            msg:"invalid account"
        })
    }
    const my_money = await Account.findOne({
        userId: req.userId
    })

    if(my_money.balance<amount){
        return res.status(500).json({
            msg:"Insufficient balance"
        })
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    try{
        await Account.updateOne(
            {userId: req.userId},
            {$inc: {balance: -amount}},
            {session}
        )
        await Account.updateOne(
            {userId: acc_id},
            {$inc: {balance: amount}},
            {session}
        )
        await session.commitTransaction()
        return res.status(200).json({
            msg:"Transaction completed"
        })
    }
    catch(e){
        await session.abortTransaction()
        return res.status(500).json({
            msg:"Transaction failed"
        })
    }
    finally{
        session.endSession(); // Always clean up
    } 
})


module.exports = router