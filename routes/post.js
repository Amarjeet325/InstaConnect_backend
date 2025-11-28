const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPost, likePost, getFeed, updatePost, deletePost } = require('../controllers/postController');


router.post('/', auth, createPost);
router.post('/:id/like', auth, likePost);
router.get('/feed', getFeed);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


module.exports = router;