var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'bCrypt -- Select operation' });
});

/* GET Encrypt page. */
router.get('/encrypt', function(req, res, next) {
  res.render('encrypt', { title: 'bCrypt -- Encrypt' });
});

/* POST Encrypt page */
router.post('/encrypt', function(req, res, next){
  var sess = req.session;
  sess.result = bCrypt.hashSync(req.body.text, bCrypt.genSaltSync(8), null);
  res.redirect('/result?result=' + sess.result);
});

/* GET Decrypt page. */
router.get('/decrypt', function(req, res, next) {
  res.render('decrypt', { title: 'bCrypt -- Hash Compare' });
});

/* POST Decrypt page. */
router.post('/decrypt', function(req, res, next) {
  var result = bCrypt.compareSync(req.body.text, req.body.hash);
  if (result === true){
    res.redirect('/result?result=The%20matches%20the%20hash!');
  }else{
    res.redirect('/result?result=The%20does%20not%20match%20the%20hash!');
  }
});


/* GET result page. */
router.get('/result', function(req, res, next) {
  var sess = req.session;
  res.render('result', { title: 'bCrypt -- Result', req: req, result: req.query.result});
  console.log(sess.result);
});

module.exports = router;
