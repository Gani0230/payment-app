const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

function authmiddleware(req,res,next){
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer")){
        res.status(403).json({})
    }
    token = token.split(" ")[1]
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRETE)
        req.userId = decoded.userId;
    }
    catch(e){
        res.status(500).json({
            msg: e,
        })
    }
    next()
}
module.exports = authmiddleware