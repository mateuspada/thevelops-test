var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {    
  global.userSchema.find({}).lean().exec(
    function(e, docs){    
      res.status(200).json(docs);
      res.end();
    }
  );
});

/* GET one user */
router.get('/:id/', function (req, res, next) {
    global.userSchema.find({_id: req.params.id}).lean().exec(
      function (e, docs) {
          if (docs) {
            res.status(200).json(docs);
            res.end();
          } else {
            res.status(404)
              .json({ error: 'user not found' });
          };
      }
    );
});

/* POST to add users */
router.post('/', function (req, res, next) {
  var email = req.body.email;
  var firstName = req.body.first_name;
  var lastName = req.body.last_name;
  var personalPhone = req.body.personal_phone;
  var password = req.body.password;

  var user = new global.userSchema({ 
    email: email, 
    first_name: firstName, 
    last_name: lastName, 
    personal_phone: personalPhone,
    password: password
  });

  user.save(function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
      }    
      
      res.status(201).json(user);
      res.end();      
  });
});

/* PUT one user */
router.put('/:id/', function (req, res, next) {
  global.userSchema.findOneAndUpdate(
    { _id: req.params.id }, req.body, { upsert: false }, function (err, doc) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.status(202).json(req.body);
        res.end();
    });
});

/* DELETE one user */
router.delete('/:id/', function (req, res, next) {
  global.userSchema.findOneAndDelete({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.status(204);
        res.end();
    });
});

module.exports = router;
