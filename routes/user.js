const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile, follow, unfollow } = require('../controllers/userController');


router.get('/:id', getProfile);
router.post('/:id/follow', auth, follow);
router.post('/:id/unfollow', auth, unfollow);


module.exports = router;