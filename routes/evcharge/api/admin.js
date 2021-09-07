const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const db = config.get('mongoURI');
const auth = require('../../../middleware/auth')
const User = require('../../../models/User');
const StationOwner = require('../../../models/StationOwner');
const Point = require('../../../models/Point');
const multer = require('multer');
const upload = multer({dest: 'routes/evcharge/api/sessionUploads'});
const csv = require('csvtojson');


//@route POST evcharge/api/usermod
//@desc Register User-Station Owners
//@access Private

router.post(
  '/usermod/:username/:password/:isStationOwner', auth,

  [
    check('username', 'Username is required').not().isEmpty()
  ],

  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      const { username, password, isStationOwner } = req.params;

      try{
          const admin = await User.findById(req.user.id) ;
          if(admin['isAdmin'] === true){
              if (isStationOwner === 'false') {
                  try {
                      let user = await User.findOne({ username });
                      if (user) {
                          const isMatch = await bcrypt.compare(password, user.password);
                          if (!isMatch) {
                              user.password = password;
                              const salt = await bcrypt.genSalt(10);
                              user.password = await bcrypt.hash(password, salt);
                              await user.save();

                              return res
                                  .status(200)
                                  .json({ msg: 'User already exists and new password was set' });
                          } else {
                              return res.status(200).json({ msg: 'User already exists' });
                          }
                      }

                      user = new User({
                          username,
                          password,
                      });

                      const salt = await bcrypt.genSalt(10);

                      user.password = await bcrypt.hash(password, salt);

                      await user.save();

                      const payload = {
                          user: {
                              id: user.id,
                          },
                      };

                      jwt.sign(
                          payload,
                          config.get('jwtSecret'),
                          { expiresIn: 3600 },
                          (err, token) => {
                              if (err) throw err;
                              res.json({ msg:"User registered successfully." });
                          }
                      );
                  } catch (err) {
                      console.error(err.message);
                      res.status(500).json({ errors: errors.array() });
                  }
              }
              if (isStationOwner === 'true') {
                  try {
                      let stationowner = await StationOwner.findOne({ username });
                      if (stationowner) {
                          const isMatch = await bcrypt.compare(password, stationowner.password);
                          if (!isMatch) {
                              stationowner.password = password;
                              const salt = await bcrypt.genSalt(10);
                              stationowner.password = await bcrypt.hash(password, salt);
                              await stationowner.save();

                              return res.status(200).json({
                                  msg: 'Station Owner already exists and new password was set',
                              });
                          } else {
                              return res
                                  .status(200)
                                  .json({ msg: 'Station Owner already exists' });
                          }
                      }

                      stationowner = new StationOwner({
                          username,
                          password,
                      });

                      const salt = await bcrypt.genSalt(10);

                      stationowner.password = await bcrypt.hash(password, salt);

                      await stationowner.save();

                      const payload = {
                          stationowner: {
                              id: stationowner.id,
                          },
                      };

                      jwt.sign(
                          payload,
                          config.get('jwtSecret'),
                          { expiresIn: 3600 },
                          (err, token) => {
                              if (err) throw err;
                              res.json({ msg: "Station Owner registered successfully." });
                          }
                      );
                  } catch (err) {
                      console.error(err.message);
                      res.status(500).json({ errors: errors.array() });
                  }
              }
          }
          else{
              res.status(400).json({msg:"No admin properties!"})}
      } catch(err){
          res.status(500).json({msg:"Server Error"})
      }



  }
);


//@route GET evcharge/api/admin/users/:username
//@desc Test route
//@access Private

router.get('/users/:username/:isStationOwner', auth, async (req, res) => {
  const { username, isStationOwner } = req.params;
  try{
      const admin = await User.findById(req.user.id) ;
      if(admin['isAdmin'] === true){
          if (isStationOwner == "false") {
              try {
                  const user = await User.findOne({username});
                  res.json(user);
              } catch (err) {
                  console.error(err.message);
                  res.status(500).send('Server Error');
              }
          } else {
              try {
                  const stationowner = await StationOwner.findOne({username});
                  if(stationowner)
                      res.json(stationowner);
                  else res.status(402);
              } catch (err) {
                  console.error(err.message);
                  res.status(500).send('Server Error');
              }
          }
      }
      else{
          res.status(400).json({msg:"No admin properties!"})}
  } catch(err){
      res.status(500).json({msg:"Server Error"})
  }



});


router.get('/healthcheck', async (req, res) => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    res.status(200).json({ status: 'OK' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({status: "failed"});
    process.exit(1);
  }

});



router.post('/resetsessions' , async (req, res) => {
    try {
       const point = await Point.deleteMany({})
       if(!point){
           {res.status(400).json({status: 'failed'})}}
       else{res.status(200).json({status: 'OK'})}
       }
     catch (err) {
        console.error(err.message);
        res.status(400).json({status: "failed"});
        process.exit(1);
    }

});

router.post('/sessionupd', upload.single('file'), auth , async (req, res) => {
    try{
        const admin = await User.findById(req.user.id) ;
        if(admin['isAdmin'] === true){
        try {
            const csvFilePath= "./routes/evcharge/api/sessionUploads/" + req.file.filename;
            csv()
                .fromFile(csvFilePath)
                .then((jsonObj)=>{

                })
            const jsonArray=await csv().fromFile(csvFilePath);
            await Session.insertMany(jsonArray , function(err , doc){
                if(err) throw err;
                res.status(200).json({msg : "OK"})
            })
        }
        catch (err) {
            console.error(err.message);
            res.status(400).json({status: "failed"});
            process.exit(1);
        }
            }
        else{
            res.status(400).json({msg:"No admin properties!"})}
    } catch(err){
        res.status(500).json({msg:"Server Error."})
    }

});

module.exports = router;
