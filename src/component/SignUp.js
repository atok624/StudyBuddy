import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signUpWithEmail = async (event) => {
    event.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: username });
      console.log('Email user signed up:', result.user);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up with Email:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={signUpWithEmail}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up With Email</button>
      </form>
      <button onClick={() => navigate('/signin')}>
        Already have an account? Sign In
      </button>
    </div>
  );
};

export default SignUp;
