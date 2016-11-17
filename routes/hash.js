var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');

/* POST Hash page */
router.post('/hash', function(req, res, next){
  var sess = req.session;
  sess.result = bCrypt.hashSync(req.body.text, bCrypt.genSaltSync(8), null);
  console.log(sess.result);
  res.redirect('/');
});

module.exports = router;
