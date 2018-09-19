const express = require('express');
const db = require("../db");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config.json');

const router = express.Router();
const userSchema = db.Mongoose.model('users', db.UserSchema, 'users');

/* POST to add users */
router.post('/', function (req, res, next) {
    let userRequest = {
        email: req.body.email,
        password: req.body.password
    };

    if ((!userRequest.password) || (!userRequest.email)){
        res.sendStatus(400);
        return;
    }

    userSchema.findOne({email: userRequest.email}).select('+password').exec(
        function (e, user) {
            if (user) {
                if (bcrypt.compareSync(userRequest.password, user.password)){                    
                    jwt.sign(user.toJSON(), jwtConfig.jwtKey, (err, token) => {
                        if (err) {
                            res.status(500).json({ error: err.message }).end();
                            return;
                        }      
                
                        res.status(200).json({token}).end();
                    }); 
                } else {
                    res.status(422).json({error: "invalid password"});    
                }
            } else {
              res.status(404).json({error: 'user not found' }).end();
            };
        }
      );

       
});

module.exports = router;