// server/controllers/commentController.js
import Comment from '../models/commentModel.js';

// @desc    Get all comments and structure them in a nested way
// @route   GET /api/comments
export const getComments = async (req, res) => {
  try {
    // Fetch all comments and populate the 'user' field with name and avatar
    const comments = await Comment.find().populate('user', 'name avatar').sort({ createdAt: -1 });

    // This is the magic part: transform flat list to a nested tree
    const commentMap = {};
    const nestedComments = [];

    // First pass: create a map of all comments by their ID
    comments.forEach(comment => {
      commentMap[comment._id] = comment.toObject();
      commentMap[comment._id].replies = [];
    });

    // Second pass: link replies to their parents
    comments.forEach(comment => {
      if (comment.parent) {
        // If it's a reply, push it to its parent's 'replies' array
        if(commentMap[comment.parent]) {
          commentMap[comment.parent].replies.push(commentMap[comment._id]);
        }
      } else {
        // If it's a top-level comment, push it to the root array
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.json(nestedComments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new comment
// @route   POST /api/comments
export const createComment = async (req, res) => {
  // We'll need middleware to get the user ID from the token
  // For now, let's assume it's passed in the body for simplicity
  const { text, parentId, userId } = req.body; 
  
  if (!text || !userId) {
    return res.status(400).json({ message: 'Text and userId are required' });
  }

  const comment = new Comment({
    text,
    user: userId,
    parent: parentId || null,
  });

  const createdComment = await comment.save();
  const populatedComment = await Comment.findById(createdComment._id).populate('user', 'name avatar');
  res.status(201).json(populatedComment);
};

// @desc    Upvote a comment
// @route   PUT /api/comments/:id/upvote
export const upvoteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      comment.upvotes += 1;
      const updatedComment = await comment.save();
      res.json(updatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};