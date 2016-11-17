var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RDBStore = require('express-session-rethinkdb')(session);
var cookieParser = require('cookie-parser')

var routes = require('./routes/index');
var hash = require('./routes/hash');
var comparehash = require('./routes/compare-hash');


var app = express();
var rdbStore = new RDBStore({
  connectOptions: {
    servers: [
      { host: 'localhost', port: 28015 }
    ],
    db: 'melon_session',
    discovery: false,
    pool: true,
    buffer: 50,
    max: 1000,
    timeout: 20,
    timeoutError: 1000
  },
  table: 'sessions',
  sessionTimeout: 2000,
  flushInterval: 60000,
  debug: false
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(session({
  key: 'sid',
  resave: true,
  saveUninitialized: true,
  secret: 'DAnKMememEncrtyawd',
  cookie: { maxAge: 2000 },
  store: rdbStore
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/hash', hash);
app.use('/compare-hash', comparehash);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
