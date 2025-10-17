import { useState, useEffect } from 'react';
import api from '../context/AuthContext';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useAuth } from '../context/AuthContext';
import styles from './CommentSection.module.css';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await api.get('/comments');
      setComments(data);
    };
    fetchComments();
  }, []);

  const handleAddComment = (newComment) => {
    if (newComment.parent) {
      const addReplyToState = (allComments) =>
        allComments.map(c =>
          c._id === newComment.parent
            ? { ...c, replies: [...(c.replies || []), newComment] }
            : { ...c, replies: c.replies ? addReplyToState(c.replies) : [] }
        );
      setComments(addReplyToState);
    } else {
      setComments([newComment, ...comments]);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Comments</h2>
      <CommentForm userId={user._id} onCommentAdded={handleAddComment} />
      <div className={styles.commentsList}>
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} onReplyAdded={handleAddComment} />
        ))}
      </div>
    </div>
  );
};
export default CommentSection;