import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google user signed in:', result.user);
      navigate('/Dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message);
    }
  };

  // const signInWithFacebook = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, facebookProvider);
  //     console.log('Facebook user signed in:', result.user);
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error signing in with Facebook:', error);
  //     setError(error.message);
  //   }
  // };

  const signInWithEmail = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email user signed in:', result.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Email:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h3>Sign In</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      {/* <button onClick={signInWithFacebook}>Sign In With Facebook</button> */}
      <form onSubmit={signInWithEmail}>
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
        <button type="submit">Sign In With Email</button>
      </form>
      <button onClick={() => navigate('/signup')}>
        Need an account? Sign Up
      </button>
    </div>
  );
};

export default SignIn;
