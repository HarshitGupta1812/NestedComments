import CommentSection from '../components/CommentSection';
import { useAuth } from '../context/AuthContext';
import styles from './PostPage.module.css';

const PostPage = () => {
  const { user, logout } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
            <div className={styles.userInfo}>
                <img src={user.avatar} alt="User Avatar" className={styles.avatar}/>
                <p className={styles.userName}>{user.name}</p>
            </div>
            <button onClick={logout} className={styles.logoutButton}>Logout</button>
        </header>
        <article className={styles.postArticle}>
            <h1 className={styles.postTitle}>Commnets</h1>
            <p className={styles.postBody}>Fun chats and gossips with friends and family.</p>
        </article>
        <CommentSection />
      </div>
    </div>
  );
};
export default PostPage;