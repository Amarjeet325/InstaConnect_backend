const Post = require('../models/post');
const User = require('../models/user');


exports.createPost = async (req, res) => {
  try {
    const { caption, image } = req.body;
    const post = new Post({ author: req.user._id, caption, image });
     await post.save();

    res.status(201).json({ message: 'Post created successfully', post });

   } catch (err) {
      console.error(err);
      res.status(500).json({ message: ' internal Server error' });
    }
};


exports.likePost = async (req, res) => {

 try {
    const post = await Post.findById(req.params.id);
     if (!post) return res.status(404).json({ message: 'Post  page not found' });


      const userId = req.user._id;
      if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(u => !u.equals(userId));
     await post.save();
     return res.json({ message: ' post unliked ' });
  }

      post.likes.push(userId);
      await post.save();
      res.json({ message: ' post liked ' });

} catch (err) {
     console.error(err);
     res.status(500).json({ message: ' internal Server error' });
   } 
};

exports.getFeed = async (req, res) => {
  try {
     const posts = await Post.find()
      .populate('author', 'username avatar')
      .populate('comments.author', 'username avatar')
      .sort({ createdAt: -1 });

     res.json({ posts });
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: ' internal Server error' });
   }
};


exports.updatePost = async (req, res) => {
  try {
    const { caption, image } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author of the post
    if (!post.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    // Update caption and image if provided
    if (caption !== undefined) post.caption = caption;
    if (image !== undefined) post.image = image;

    await post.save();
    res.json({ message: 'Post updated successfully', post });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server error' });
  }
};


exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author of the post
    if (!post.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server error' });
  }
};
