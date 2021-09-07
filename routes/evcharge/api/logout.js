const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth.js');
const ExpiredToken = require("../../../models/ExpiredTokens");
//@route POST evcharge/api/logout
//@desc Logout User
//@access Public


router.post('/' ,  auth , async (req,res) =>{
    try{
        const kati = req.header('x-auth-token');
        let expiredToken = new ExpiredToken({"tokenID" : kati});
        await expiredToken.save();
        res.status(200).json(({ msg: "Token deleted. Successfully Logged out"}))
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error") ; 
    }
});

module.exports = router;
 