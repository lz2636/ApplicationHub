const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', function (req, res) {
    res.redirect('../');
});

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile']
    })
);

router.get('/google/callback', passport.authenticate('google'));

module.exports = router;