var express = require('express');
var router = express.Router();

var passport = require('passport');

/* GET users listing. */

router.get('/login', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/login', {messages: messages, hasErrors: messages.length > 0});
});

router.post('/login', passport.authenticate('local.login', {
  failureRedirect: '/user/login',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(req.session.oldUrl);// put req before res.
  } else {
    res.redirect('/videos');
  }
});

router.get('/signup', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', { messages: messages, hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/login',
  failureRedirect: '/user/signup',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(req.session.oldUrl);
  } else {
    res.redirect('/user/login');
  }
});

router.use('/', checkAuthentication, function (req, res, next) {
  next();
});

router.get('/logout', checkAuthentication, function (req, res, next) {
  req.logout();     //  be careful here , if the projects not saved
  res.redirect('/user/login');
});

module.exports = router;

function checkAuthentication(req, res, next) {//do something only if user is authenticated
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/user/login");
  }
}


// all operations need a operator, so checkAuthentication. !!! 