const express = require('express')
const { Account } = require('../db')
const authmiddleware = require('../middleware')

const router = express.Router()
router.get("/balance",authmiddleware ,async (req,res)=>{
    const current_acc = await Account.findOne({userId: req.userId})
    res.status(200).json({
        balance: current_acc.balance
    })
})

module.exports = router