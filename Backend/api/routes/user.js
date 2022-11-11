const express = require('express');
const router = express.Router();
const {activate_acc,login,forgot_pass,register,acc_recover} = require('../../controller/user');
const {ACTIVATE_ACC,LOGIN,FORGOT_PASS,REGISTER,ACC_RECOVER} = require('../../utils/config').ROUTES.USER;
router.post(LOGIN,login);
router.post(FORGOT_PASS,forgot_pass);
router.post(REGISTER,register);
router.post(ACC_RECOVER,acc_recover);
router.get(ACTIVATE_ACC,activate_acc);
module.exports = router;