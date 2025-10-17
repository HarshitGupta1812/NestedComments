import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- ADD THIS LINE
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostPage from './pages/PostPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<PostPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;