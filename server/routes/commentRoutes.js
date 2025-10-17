// server/routes/commentRoutes.js
import express from 'express';
import { getComments, createComment, upvoteComment } from '../controllers/commentController.js';
const router = express.Router();

router.route('/').get(getComments).post(createComment);
router.route('/:id/upvote').put(upvoteComment);

export default router;