const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const JWT = require('jsonwebtoken');
const User = require('../models/user');


const signToken = userID => {
    return JWT.sign({
        iss: 'Mojo',
        sub: userID
    }, "MojoMojoMojo", { expiresIn: "1h" });
}
router.get('/ping', (req, res) => {
    res.json({success:true, msg: 'pong'});
});
router.post('/user/register', (req, res) => {
    const { username, password, email } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occurred", msgError: true } });
        if (user)
            res.status(400).json({ message: { msgBody: "email is already used", msgError: true } });
        else {
            const newUser = new User({ username, password, email });
            newUser.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "Error has occurred", msgError: true } });
                else
                    res.status(201).json({ user: username, message: { msgBody: "Account successfully created", msgError: false } });

            });
        }
    })
});

router.post('/user/login', passport.authenticate('local', { session: false }), (req, res) => {
    // console.log(req.body);
    if (req.isAuthenticated()) {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username } });
    }
});

router.get('/user/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: "" }, success: true });
});




module.exports = router;