var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'bCrypt -- Select operation' });
});

/* GET Hash page. */
router.get('/hash', function(req, res, next) {
  res.render('hash', { title: 'bCrypt -- Hash' });
});

/* POST Hash page */
router.post('/hash', function(req, res, next){
  var sess = req.session;
  sess.result = bCrypt.hashSync(req.body.text, bCrypt.genSaltSync(8), null);
  res.redirect('/result?result=' + sess.result);
});

/* GET Compare Hash page. */
router.get('/compare-hash', function(req, res, next) {
  res.render('compare-hash', { title: 'bCrypt -- Hash Compare' });
});

/* POST Compare Hash page. */
router.post('/compare-hash', function(req, res, next) {
  var result = bCrypt.compareSync(req.body.text, req.body.hash);
  if (result === true){
    res.redirect('/result?result=The%20text%20matches%20the%20hash!');
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
