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


exports.updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const commentId = req.params.id;
    
    if (!text) return res.status(400).json({ message: 'Text is required' });
    
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    
    if (!comment.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }
    
    comment.text = text;
    await comment.save();
    
    res.json({ message: 'Comment updated successfully', comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server error' });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    
    if (!comment.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    
    const post = await Post.findById(comment.post);
    if (post) {
      post.comments = post.comments.filter(cId => !cId.equals(commentId));
      await post.save();
    }
    
    await Comment.findByIdAndDelete(commentId);
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server error' });
  }
};