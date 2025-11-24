const Comment = require('../models/comment');
const Post = require('../models/post');


exports.createComment = async (req, res) => {
    try {
      const { text } = req.body;
      const postId = req.params.postId;
      const post = await Post.findById(postId);

     if (!post) return res.status(404).json({ message: 'Post not found' });


     const comment = new Comment({ post: postId, author: req.user._id, text });
     await comment.save();


   post.comments.push(comment._id);
    await post.save();


   res.status(201).json({ message: 'Comment added successfully', comment });
   } 
 
 catch (err) {
   console.error(err);
   res.status(500).json({ message: ' internal Server error' });
  }
};


exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    const userId = req.user._id;

   if (comment.likes.includes(userId)) {
    comment.likes = comment.likes.filter(u => !u.equals(userId));
    await comment.save();
    return res.json({ message: 'Unliked comment' });
}


   comment.likes.push(userId);
   await comment.save();
   res.json({ message: 'Liked comment' });

  } catch (err) {
     console.error(err);
     res.status(500).json({ message: ' internal Server error' });
  }
};