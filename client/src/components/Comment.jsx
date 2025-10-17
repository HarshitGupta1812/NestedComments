import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import CommentForm from './CommentForm';
import styles from './Comment.module.css';

const Comment = ({ comment, onReplyAdded }) => {
  const { user } = useAuth();
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleUpvote = async () => {
    const { data } = await api.put(`/comments/${comment._id}/upvote`);
    setUpvotes(data.upvotes);
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <motion.div className={styles.comment} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
       <img src={comment.user?.avatar ?? 'https://i.pravatar.cc/150'} alt={comment.user?.name ?? 'Deleted User'} className={styles.avatar} />
      <div className={styles.commentBody}>
        <div className={styles.commentHeader}>
            <span className={styles.userName}>{comment.user?.name ?? '[Deleted User]'}</span>
            <span className={styles.timestamp}>· {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
        </div>
        <p className={styles.commentText}>{comment.text}</p>
        <div className={styles.commentActions}>
            <button onClick={handleUpvote} className={styles.actionButton}>👍 {upvotes}</button>
            <button onClick={() => setShowReplyForm(!showReplyForm)} className={styles.actionButton}>↩️ Reply</button>
        </div>
        <AnimatePresence>
          {showReplyForm && (
            <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}}>
              <CommentForm userId={user._id} parentId={comment._id} onCommentAdded={(newReply) => { onReplyAdded(newReply); setShowReplyForm(false); }} />
            </motion.div>
          )}
        </AnimatePresence>
        {hasReplies && (
          <button onClick={() => setIsCollapsed(!isCollapsed)} className={styles.repliesToggle}>
            {isCollapsed ? `Show ${comment.replies.length} replies` : 'Hide replies'}
          </button>
        )}
        <AnimatePresence>
          {!isCollapsed && hasReplies && (
            <motion.div className={styles.repliesContainer}>
              {comment.replies.map((reply) => (
                <Comment key={reply._id} comment={reply} onReplyAdded={onReplyAdded} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default Comment;