const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createComment, likeComment } = require('../controllers/commentController');


router.post('/:postId', auth, createComment); 
router.post('/like/:id', auth, likeComment); 


module.exports = router;