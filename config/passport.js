var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../model/user');

passport.use('local.signup',new LocalStrategy(
    
    {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    
    
    function (req, email, password, done) {
        req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid Password').notEmpty().isLength({ min: 4 });
        req.checkBody('username', 'Need A Username').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            let messages = [];
            errors.forEach(err => messages.push(err.message));
            return done(null, false, req.flash('error', messages));
        };

        User.findOne({ 'email' : email }, function (err, user) {
            
            if (err) { return done(err); }

            if (user) {
                return done(null, false, { message: 'Email is already in use.' });
            }

            if (!user) {
                var newUser = new User({
                    email : email,
                    password : password,
                    username :  req.body.username
                });
                newUser.password = newUser.encryptPassword(password);
                newUser.save(function(err,result){
                    if (err) {
                        return done(err);
                    }
                    return done(null,newUser);
                });
            }
            
        });
    }
));

passport.use('local.login', new LocalStrategy(
    
    {
    usernameField: 'email',
    passwordField: 'password',
    // need req
    passReqToCallback: true
    },

    function (req, email, password, done) {
        req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid Password').notEmpty();
        var errors = req.validationErrors();

        if (errors) {
            let messages = [];
            errors.forEach(err => messages.push(err.message));
            return done(null,false,req.flash('error',messages));
        }

        User.findOne({ 'email' : email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
