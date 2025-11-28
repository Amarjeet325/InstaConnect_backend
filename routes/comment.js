const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createComment, likeComment, updateComment, deleteComment } = require('../controllers/commentController');


router.post('/:postId', auth, createComment); 
router.post('/like/:id', auth, likeComment); 
router.put('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);

module.exports = router;