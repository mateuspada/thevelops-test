const express = require('express');
const db = require("../db");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const userSchema = db.Mongoose.model('users', db.UserSchema, 'users');

/* POST to add users */
router.post('/', function (req, res, next) {
    let userRequest = {
        email: req.body.email,
        password: req.body.password
    };

    userSchema.findOne({email: userRequest.email}).select('+password').exec(
        function (e, user) {
            if (user) {
                console.log(user.email);
                if (bcrypt.compareSync(userRequest.password, user.password)){
                    console.log(user.toJSON());
                    jwt.sign(user.toJSON(), "thevelops", (err, token) => {
                        if (err) {
                            res.status(500).json({ error: err.message }).end();
                            return;
                        }      
                
                        res.status(200).json({token}).end();
                    }); 
                }
            } else {
              res.status(404).json({error: 'user not found' }).end();
            };
        }
      );

       
});

module.exports = router;