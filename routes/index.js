var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'bCrypt -- Select operation' });
});

/* POST Hash page */
router.post('/hash', function(req, res, next){
  var sess = req.session;
  sess.result = bCrypt.hashSync(req.body.text, bCrypt.genSaltSync(8), null);
  res.send(sess.result);
});

/* POST Compare Hash page. */
router.post('/compare-hash', function(req, res, next) {
  var result = bCrypt.compareSync(req.body.text, req.body.hash);
  if (result === true){
    res.send('TRUE');
  }else{
    res.send('FALSE');
  }
});

module.exports = router;
