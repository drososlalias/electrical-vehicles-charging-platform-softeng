const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check , validationResult} = require('express-validator');
const auth = require('../../../middleware/auth');
const User = require("../../../models/User");
const StationOwner = require("../../../models/StationOwner");
const StationMaps = require("../../../models/StationMaps");

//@route GET api/user/me
//@desc Get Logged in User
//@access Private
router.get('/user/me' , auth , async  (req,res) => {
    try{
        const user = await User.findById( req.user.id).select('-password -_id');
        if(!user){
            return res.status(400).json({msg: "There is no profile!"});
        }
        res.json({ user});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/stationowner/me' , auth , async  (req,res) => {
    try{
        const stationowner  = await StationOwner.findById( req.user.id).select('-password -_id');
        if(!stationowner){
            return res.status(400).json({msg: "There is no profile!"});
        }
        res.json({ stationowner});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})





router.post('/:username/:password/:isStationOwner' ,
[
    check('username','Username is required').not().isEmpty(),
    check('password','Password is required').not().isEmpty()
],
 async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password , isStationOwner } = req.params;

    if(isStationOwner ==='false'){
    try{
        let user = await User.findOne( {username});
        if(!user){
            return res.status(400).json({error: [ {msg: 'Invalid Credentials'}]});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors:  errors.array()});
        }

    const payload = {
        user:{
            id: user.id
        }
    };

    jwt.sign(
        payload, 
        config.get('jwtSecret'), 
        {expiresIn:3600},
        (err,token) => {
            if(err) throw err;
            res.json({ token }) ;
        }
        )} catch(err) {
            console.error(err.message);
        res.status(500).json({ errors: errors.array() });
    }
    }
    if(isStationOwner ==='true'){
        try{
            let stationowner = await StationOwner.findOne( {username});
            if(!stationowner){
                return res.status(400).json({error: [ {msg: 'Invalid Credentials'}]});
            }
            
            const isMatch = await bcrypt.compare(password, stationowner.password);
            if (!isMatch) {
                return res.status(400).json({ error: [{ msg: 'Invalid Credentials' }] });
            }
    
        const payload = {
            user:{
                id: stationowner.id
            }
        };

        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            {expiresIn:3600},
            (err,token) => {
                if(err) throw err;
                res.json({ token }) ;
            }
            )} catch(err) {
                console.error(err.message);
            res.status(500).json({ errors: errors.array() });
        }
    }
} );

/*
router.post('/passwords' , async  (req,res) => {

    const user = await User.find({},{ "username": 1 },  (err,docs) =>{
        docs.forEach(async (doc)=> {
            doc.username = doc.username.replace(" " , "");
             await User.updateOne(
                { "_id": doc._id },
                { "$set": { "username": doc.username } }
            );
        })

    })

})*/

router.get('/getStations' ,auth, async (req,res) => {
    const stations = await StationMaps.find({});
    res.send( stations);
})


module.exports = router;
 