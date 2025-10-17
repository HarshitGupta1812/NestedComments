import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Failed to login', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder="Password" required />
          <button type="submit" className={styles.button}>Sign In</button>
        </form>
        <p className={styles.linkText}>
          Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;