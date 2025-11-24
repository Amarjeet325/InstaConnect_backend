const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPost, likePost } = require('../controllers/postController');


router.post('/', auth, createPost);
router.post('/:id/like', auth, likePost);


module.exports = router;