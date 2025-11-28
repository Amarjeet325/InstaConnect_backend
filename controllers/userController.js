const User = require('../models/user');


exports.getProfile = async (req, res) => {
   try {
     const { id } = req.params;
     const user = await User.findById(id).select('-password').populate('followers following', 'username bio avatar');
     
     if (!user)
      return res.status(404).json({ message: 'User not found' });
    res.json(user);
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' internal Server error' });
  }
};


exports.follow = async (req, res) => {
try {
    const targetId = req.params.id;
     const me = req.user;

     if (me._id.equals(targetId)) 
     return res.status(400).json({ message: 'Cannot follow yourself' });

     const target = await User.findById(targetId);
     if (!target)    
     return res.status(404).json({ message: 'Target user not found' });



    if (target.followers.includes(me._id))
    
    return res.status(400).json({ message: 'Already following' });
     target.followers.push(me._id);
     me.following.push(target._id);
     await target.save();
     await me.save();

     res.json({ message: 'Now following', target: targetId });
     } catch (err) {
      console.error(err);
      res.status(500).json({ message: ' internal Server error' });
  }
};


exports.unfollow = async (req, res) => {
  try {
    const targetId = req.params.id;
    const me = req.user;
    if (me._id.equals(targetId)) return res.status(400).json({ message: 'Cannot unfollow yourself' });
    
    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ message: 'Target user not found' });
    
    target.followers = target.followers.filter(f => !f.equals(me._id));
     me.following = me.following.filter(f => !f.equals(target._id));
     await target.save();
     await me.save();
     
     res.json({ message: 'Unfollowed', target: targetId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: ' internal Server error' });
    }
  };