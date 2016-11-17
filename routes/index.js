var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  res.render('index', { title : 'bCrypt', result : sess.result});
});

/* POST Hash page */
router.post('/hash', function(req, res, next){
  var sess = req.session;
  sess.result = bCrypt.hashSync(req.body.text, bCrypt.genSaltSync(8), null);
  console.log(sess.result);
  res.redirect('/');
});

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
