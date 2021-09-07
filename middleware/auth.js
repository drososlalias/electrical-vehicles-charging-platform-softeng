const jwt = require('jsonwebtoken');
const config = require('config');
const ExpiredToken = require("../models/ExpiredTokens");
module.exports = async function(req,res,next) {
    //Get the token from header
    const token = req.header('x-auth-token');
    let findToken = await ExpiredToken.findOne({"tokenID" : token} , function (err,res){});
    //Check if no token 
    if(!token){
        return res.status(401).json({msg: "No token, authorization denied"});
    }
    if(findToken != null)
    {
        return res.status(401).json({msg: "Expired Token"});
    }
    //Verify Token
    try {
    const decoded = jwt.verify(token,config.get('jwtSecret'));
    req.user = decoded.user;
    next();
    } catch(err){
    res.status(401).json({ msg : 'Token is not valid'});
    }
}