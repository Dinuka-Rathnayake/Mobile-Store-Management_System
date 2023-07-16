const express = require("express");
const res = require('express/lib/response');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

//load input validation 
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

//user model
const UserMdl = require("../models/UserSchema");

router.route("/user/register").post((req,res) => {
    console.log(req.body.name)
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    UserMdl.findOne({email:req.body.email}).then(User =>{
        if(User){
            return res.status(400).json({email:"User already exists"})
        } else {
            const newUser = new UserMdl({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            });

            //convert password into hash before store in DB
            const rounds = 10;
            bcrypt.genSalt(rounds, (err, salt) => {
                bcrypt.hash(newUser.password,salt,(err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST /users/login
// @desc Login user and return JWT token
// @access Public

let refreshTokens = [];

router.route("/user/login").post((req,res) => {

//login validation`
const {errors, isValid} = validateLoginInput(req.body);

if(!isValid){
    return res.status(400).json(errors);
}

const email = req.body.email;
const password = req.body.password;


UserMdl.findOne({email}).then(user =>{
    if(!user){
        return res.status(404).json({emailnotfound: "Email not found"});
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch=>{
        
        if(isMatch){
            // create jwt payload
            const payload = {
                userId: user.id,
                name: user.name,
                role: user.role,
                email: user.email
            };

             // accessToken & refreshToken
             
            //  jwt.sign( payload,process.env.TOKEN_KEY,{expiresIn: '10s'},(err, token)=> {
            //     res.send({token: "bearer " + token}); });

             const token = jwt.sign( payload,process.env.TOKEN_KEY,{expiresIn: '24h'}); // 5min
             //const refreshToken = jwt.sign(payload,process.env.REFRESH_KEY,{expiresIn: '24h'});
            // refreshTokens.push(refreshToken);
             res.status(200).json({ token });


        }else {
            return res.status(400).json({passwordincorrect: "Password is incorect"});
        }
    });

 });

});



router.post('/user/token',(req,res)=>{

    const refreshToken = req.body.refreshToken;
    if(refreshToken == null) {
        res.sendStatus(401);
      }
    if(!refreshTokens.includes(refreshToken)) {
        res.sendStatus(403);
      }

    jwt.verify(refreshToken,process.env.REFRESH_KEY,(err,user)=>{
       if(err){
        res.sendStatus(403);
    }

     // create jwt payload
     const payload = {
        id: user.id,
        name: user.name
    };

       const accessToken = jwt.sign(payload,process.env.TOKEN_KEY,{expiresIn: '10s'});
       res.send({accessToken});
    });
 });
 
 
//  router.delete('/logout',(req,res)=>{
//     const refreshToken = req.body.refreshToken;
//      refreshTokens = refreshTokens.filter(t=> t !== refreshToken);
//      res.sendStatus(204);
//     });
 

// test read for auth
router.route("/user/show").get((req,res)=>{

    // const user = req.user;
    // res.json(user);

    UserMdl.find().then((UserMdl)=>{
        res.json(UserMdl)
    }).catch((err)=>{
        res.json(err)
    })
})

module.exports = router;