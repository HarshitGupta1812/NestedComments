import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.css'; // We can reuse the login styles

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }
    try {
      await register(name, email, password);
      navigate('/');
    } catch (error) {
      console.error('Failed to sign up', error);
      alert(error.response?.data?.message || 'Failed to sign up');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create an Account</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} placeholder="Full Name" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder="Password (min. 6 characters)" required />
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
        <p className={styles.linkText}>
          Already have an account? <Link to="/login" className={styles.link}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;