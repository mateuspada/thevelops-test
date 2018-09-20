const express = require('express');
const db = require("../db");
const bcrypt = require('bcrypt-nodejs');
const token = require('./token');

const router = express.Router();
const userSchema = db.Mongoose.model('users', db.UserSchema, 'users');

/* GET users listing. */
router.get('/', token.verifyToken, function(req, res, next) {
  userSchema.find({}).lean().exec(
    function(e, docs){    
      res.status(200).json(docs);
      res.end();
    }
  );
});

/* GET one user */
router.get('/:id/', token.verifyToken, function (req, res, next) {    
    if (req.params.id !== req.tokenData._id){
      res.status(403).json({error: "token user doesn't match with request user"});
    } else {
      userSchema.find({_id: req.params.id}).lean().exec(
        function (e, docs) {
            if (docs) {
              res.status(200).json(docs).end();
            } else {
              res.status(404).json({error: 'user not found' }).end();
            };
        }
      );
    }
});

/* POST to add users */
router.post('/', function (req, res, next) {
  let userRequest = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    personal_phone: req.body.personal_phone,
    password: req.body.password
  };

  let user = new userSchema(userRequest);
  user.password = bcrypt.hashSync(req.body.password);
  const validate = user.joiValidate(userRequest);
  if (validate.error){
    res.status(400).json({error: validate.error}).end();
    return;
  }

  user.save(function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
      }          
      res.status(201).json(user.toJSON());
      res.end();      
  });
});

/* PUT one user */
router.put('/:id/', token.verifyToken, function (req, res, next) {
  if (req.params.id !== req.tokenData._id){
    res.status(403).json({error: "token user doesn't match with request user"});
  } else {
    let userRequest = {
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      personal_phone: req.body.personal_phone
    };

    if ((req.body.password !== 'undefined') && (req.body.password)) {
      userRequest.password = bcrypt.hashSync(req.body.password);
    }

    userSchema.findOneAndUpdate(
      { _id: req.params.id }, userRequest, { upsert: false }, function (err, doc) {
          if (err) {
              res.status(500).json({ error: err.message });
              res.end();
              return;
          }

          res.status(202).json(userRequest);
          res.end();
      });
  }
});

/* DELETE one user */
router.delete('/:id/', function (req, res, next) {
  if (req.params.id !== req.tokenData._id){
    res.status(403).json({error: "token user doesn't match with request user"});
  } else {
    userSchema.findOneAndDelete({ _id: req.params.id }, function (err) {
          if (err) {
              res.status(500).json({ error: err.message });
              res.end();
              return;
          }
          res.status(204);
          res.end();
      });
  }
});

module.exports = router;
