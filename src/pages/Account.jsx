import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

export default function Account() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('userData', JSON.stringify({
          id: data.userId || Date.now(),
          fullName: data.fullName || formData.email.split('@')[0],
          email: formData.email,
          isLoggedIn: true,
          createdAt: new Date().toISOString()
        }));

        const existingPromo = localStorage.getItem('newMemberPromo');
        if (!existingPromo) {
          localStorage.setItem('newMemberPromo', JSON.stringify({
            code: 'NEWMEMBER',
            discount: 0.05,
            used: false
          }));
        }

        alert('✅ Login successful!');
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      const savedUser = localStorage.getItem('userData');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.email === formData.email && user.password === formData.password) {
          localStorage.setItem('userData', JSON.stringify({
            ...user,
            isLoggedIn: true
          }));
          navigate('/');
        } else {
          setError('Invalid credentials');
        }
      } else {
        setError('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success || response.ok) {
        const newUser = {
          id: data.userId || Date.now(),
          fullName: formData.fullName,
          email: formData.email,
          isLoggedIn: true,
          createdAt: new Date().toISOString(),
          password: formData.password
        };

        // Save user data
        localStorage.setItem('userData', JSON.stringify(newUser));

        // ✅ ASSIGN NEWMEMBER CODE
        const newMemberPromo = {
          code: 'NEWMEMBER',
          discount: 0.05,
          used: false,
          assignedAt: new Date().toISOString(),
          assignedTo: formData.email
        };
        localStorage.setItem('newMemberPromo', JSON.stringify(newMemberPromo));

        // Save membership info
        const membershipData = {
          email: formData.email,
          status: 'standard',
          joinDate: new Date().toISOString(),
          promoCode: 'NEWMEMBER',
          promoUsed: false,
          totalSpent: 0,
          points: 0
        };
        localStorage.setItem('membershipData', JSON.stringify(membershipData));

        alert('✅ Account created!\n\nYou have 10% OFF code: NEWMEMBER');
        setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
        setIsLogin(true);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      
      // Fallback - save locally even if API fails
      const newUser = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
        password: formData.password
      };
      localStorage.setItem('userData', JSON.stringify(newUser));

      localStorage.setItem('newMemberPromo', JSON.stringify({
        code: 'NEWMEMBER',
        discount: 0.05,
        used: false,
        assignedAt: new Date().toISOString(),
        assignedTo: formData.email
      }));

      localStorage.setItem('membershipData', JSON.stringify({
        email: formData.email,
        status: 'standard',
        joinDate: new Date().toISOString(),
        promoCode: 'NEWMEMBER',
        promoUsed: false,
        totalSpent: 0,
        points: 0
      }));

      alert('✅ Account created!\n\nYou have 10% OFF code: NEWMEMBER');
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      setIsLogin(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <button className="account-history-btn" onClick={() => navigate('/history')}>
            📋 View My History
          </button>
        </div>

        <div className="account-form-wrapper">
          {isLogin ? (
            // ===== LOGIN FORM =====
            <form onSubmit={handleLogin}>
              <p className="account-eyebrow">Welcome Back</p>
              <h2 className="account-title">Sign In</h2>
              <p className="account-subtitle">Sign in to manage your orders and wishlist.</p>

              {error && <div className="error-message">{error}</div>}

              <div className="account-form">
                <input
                  type="email"
                  name="email"
                  className="account-input"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="password"
                  className="account-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  className="account-submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>

              <div className="account-toggle">
                <p>Don't have an account? <button type="button" className="toggle-link" onClick={() => { setIsLogin(false); setError(''); }}>Sign Up</button></p>
              </div>
            </form>
          ) : (
            // ===== SIGNUP FORM =====
            <form onSubmit={handleRegister}>
              <p className="account-eyebrow">Welcome Back</p>
              <h2 className="account-title">Create Account</h2>
              <p className="account-subtitle">Create an account to start shopping and get exclusive benefits!</p>

              {error && <div className="error-message">{error}</div>}

              <div className="account-form">
                <input
                  type="text"
                  name="fullName"
                  className="account-input"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  className="account-input"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="password"
                  className="account-input"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="confirmPassword"
                  className="account-input"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  className="account-submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>

              <div className="account-toggle">
                <p>Already have an account? <button type="button" className="toggle-link" onClick={() => { setIsLogin(true); setError(''); }}>Sign In</button></p>
              </div>

              <div className="benefits-box">
                <h3>🎁 Registration Benefits:</h3>
                <ul>
                  <li>✓ 10% OFF your first purchase with code NEWMEMBER</li>
                  <li>✓ Free shipping on orders over $50</li>
                  <li>✓ Access to exclusive member-only deals</li>
                  <li>✓ Earn points on every purchase</li>
                  <li>✓ VIP status after $500 spent</li>
                </ul>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
