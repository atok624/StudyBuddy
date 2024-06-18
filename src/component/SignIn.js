import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, provider, facebookProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    setIsLoading(true); // Start loading state
    setError(null); // Clear previous errors

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google user signed in:', result.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  const signInWithFacebook = async () => {
    setIsLoading(true); // Start loading state
    setError(null);
    
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log('Facebook user signed in:', result.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
      setError(error.message);
    }
  };

  const signInWithEmail = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    setIsLoading(true); // Start loading state
    setError(null); // Clear previous errors

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email user signed in:', result.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Email:', error);
      setError(error.message);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div>
      <h3>Sign In</h3>
      {isLoading && <p>Loading...</p>} {/* Display loading indicator */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={signInWithGoogle} disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In With Google"}
      </button>
      <button onClick={signInWithFacebook} disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In With Facebook"}
      </button>
      <form onSubmit={signInWithEmail}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In With Email"}
        </button>
      </form>
      <button onClick={() => navigate('/signup')}>
        Need an account? Sign Up
      </button>
    </div>
  );
};

export default SignIn;
