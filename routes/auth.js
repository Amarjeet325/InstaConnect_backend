const express = require('express');
const router = express.Router();
const { signup, login, logout, me } = require('../controllers/authController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { userRegistrationSchema, userLoginSchema } = require('../validation/uservalidation');

router.post('/signup', validate(userRegistrationSchema), signup);
router.post('/login', validate(userLoginSchema), login);
router.post('/logout', logout);
router.get('/me', auth, me);


module.exports = router;