const express = require('express');
const router = express.Router();
const passport = require('passport');
const keys = require('../config/key');
const cookieSession = require('cookie-session');

router.use(cookieSession({
    //1 month
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/', function (req, res) {
    res.redirect('../');
});

router.get('/current_user', function (req, res) {
    res.send(req.user);
});

router.get('/logout', function (req, res) {
    console.log('try to logout!');
    req.logout();
    passport.user = null;
    delete req.session;
    res.send(req.user);
});


router.get('/google',
    passport.authenticate('google', {
        scope: ['profile']
    })
);

router.get('/google/callback', passport.authenticate('google'));

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github'),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

module.exports = router;