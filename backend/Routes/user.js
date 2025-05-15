
const express = require('express')
const router = express.Router()
const z = require('zod')
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const { User, Account } = require('../db')

const authmiddleware = require('../middleware')
dotenv.config()

const userSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    password: z.string()
})

router.post("/signup", async (req,res)=>{
    
    const validator = userSchema.safeParse(req.body)
    
    if (!validator.success){
        return res.status(501).json({
            msg: "wrong inputs"
        })
    }

    try{
        const existing_user = await User.findOne({
            email: req.body.email
        })
        if(existing_user){
            return res.status(403).json({
                msg: "user already exists"
            })
        }
        const this_user =  await User.create(req.body)
        const user_acc = await Account.create({
            userId: this_user._id,
            balance: Math.floor(Math.random()*(10000-500+1)) + 500
        })
        const token = jwt.sign({userId : this_user._id}, process.env.JWT_SECRETE)
        res.status(200).json({
            msg: "user create succesfully",
            token
        })
    }
    catch(e){
        res.status(501).json({
            msg: "User already exist",
        })
    }
    
})

const singupcheck = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

router.post("/signin",async (req,res)=>{
    const { success } = singupcheck.safeParse(req.body)
    const email = req.body.email;
    const password = req.body.password;

    if(!success){
        return res.status(500).json({
            msg:"wrong inputs"
        })
    }
    const user =await User.findOne({
        email,
        password
    })

    if(!user){
        return res.status(403).json({
            msg:"user not found"
        })
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRETE)
    res.status(200).json({
        token
    })
})

const updateUser = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().min(6).optional()
})
router.put("/update",authmiddleware,async (req,res)=>{
    const info = req.body;
    const { success } = updateUser.safeParse(info)
    if(!success){
        return  res.status(500).json({
            msg: "invalid inputs"
        })
    }
    const update_data = {};
    if(info.firstname) update_data.firstname = info.firstname;
    if(info.lastname) update_data.lastname = info.lastname;
    if(info.password) update_data.password = info.password;

    try{
        updatedUser = await User.findByIdAndUpdate(
            req.userId, update_data, {new: true}
        )
        if(updatedUser){
             return res.status(200).json({
                updatedUser
            })
        }
        else{
            return res.status(403).json({
                msg: "user not found"
            })
        }
    }
    catch(e){
        res.status(400).json({
            msg: "wrong inputs"
        })
    }
})

router.get("/bulk",authmiddleware,async (req,res)=>{
    const filter = req.body.filter || ""

    const users = await User.find({
        $or:[
            {firstname: {$regex: `^${filter}`, $options: "i"}},
            {lastname: {$regex: `^${filter}`, $options: "i"}}
        ]
    })
    res.status(200).json({
        user: users.map(user=>({
            firstname: user.firstname,
            lastname: user.lastname,
            id: user._id
        }))
    })
})


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI0NmY3ODc5ZjNjNTQwZWU4Y2IyMjMiLCJpYXQiOjE3NDcyMTgyOTZ9.lJhH5WKQoiaQI69AAP1l5TOABJD34Q6XDw9JHQ3elF4
module.exports = router