var express = require('express');
var router = express.Router();
//var jwt = require('jsonwebtoken');
var repo = require('../repo');
//var emailSenderForgotPassword = require( '../utils/emailSenderForgotPassword');


router.post('/login', async (req, res) => {
    let user = await db.authHelpers.logIn(req.body);
    if (user) {
        const signedId = {
            userId: user.id
        };
        const token = jwt.sign(signedId, process.env.AUTH_SECRET, {
            expiresIn: 60 * 60 * 24
        });
        res.json({
            success: true,
            token: token,
            userIdType: user.userType
        });
    } else {
        res.status(403).send('Invalid Login');
    }
})

router.post('/forgotPassword', async (req, res) => {
    let createdtk = await db.authRoutes.createAndGetTempToken(req.body.email);
    let success = false;
    if (createdtk.result) {
        emailSenderForgotPassword(req.body.email, createdtk.tempToken, 'resetPassword');
        success = true;
    }

    res.json({ success: success });
})



router.post('/resetPassword/:tempToken', async (req, res) => {
    let verify = await db.authRoutes.verifyTempToken(req.params.tempToken);
    let updatedpw = await db.authRoutes.updatePassword(verify.id, req.body.newPassword, verify.table);
    if (updatedpw) {
        res.json({ success: true });
    }
})


module.exports = router;