var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');

/* POST Compare Hash page. */
router.post('/compare-hash', function(req, res, next) {
  var result = bCrypt.compareSync(req.body.text, req.body.hash);
  if (result === true){
    var sess = req.session;
    sess.result = "Comparrison returned TRUE";
    res.redirect('/');
  }else{
    var sess = req.session;
    sess.result = "Comparrison returned FALSE";
    res.redirect('/');
  }
});

module.exports = router;
