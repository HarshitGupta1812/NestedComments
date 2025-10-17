import { useState } from 'react';
import api from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import styles from './CommentForm.module.css';

const CommentForm = ({ userId, parentId = null, onCommentAdded, placeholder = "Add a comment..." }) => {
  const [text, setText] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await api.post('/comments', { text, userId, parentId });
    onCommentAdded(data);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <img src={user.avatar} alt="Avatar" className={styles.avatar}/>
      <div className={styles.inputWrapper}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} className={styles.textarea} />
        <button type="submit" className={styles.button} disabled={!text.trim()}>Post</button>
      </div>
    </form>
  );
};
export default CommentForm;