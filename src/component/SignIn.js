import "./Login.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, provider, facebookProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    setIsLoading(true); // Start loading state
    setError(null); // Clear previous errors

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google user signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
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
      console.log("Facebook user signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
      setError(error.message);
    } finally {
      setIsLoading(false); // End loading state
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
      console.log("Email user signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Email:", error);
      setError(error.message);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="contain">
      <div className="row align-items-center row--first rounded">
        <div className="col-md-6 text-center">
          <img src="/images/kk-removebg-preview.png" alt="" className="first--logo"/>
          <h2>Kampus Kampanion</h2>
          <p>Your number one app to help you stay organized</p>
        </div>
        <div className="col-md-6 p-0">
          <div className="card p-4 shadow">
            <h2 className="mb-3 text-center">Sign in</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form
              onSubmit={signInWithEmail}
              className="centered-form mx-6 px-6"
            >
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="form-control"
                  required
                />
              </div>
              <h6 className="text-center mb-3">
                <a href="#" target="_blank">
                  Forgot password?
                </a>
              </h6>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block w-100 p-1"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In with Email"}
                </button>
              </div>
              <hr />

              <div>
                <button
                  type="button"
                  className="btn btn-block m-1 w-100 p-1 border border-secondary bold-border"
                  onClick={signInWithGoogle}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Signing In..."
                  ) : (
                    <>
                      <i className="fa-brands fa-google"></i> Sign In With Google
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-block m-1 w-100 p-1 border border-primary bold-border"
                  onClick={signInWithFacebook}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Signing In..."
                  ) : (
                    <>
                      <i className="fa-brands fa-facebook"></i> Sign In With
                      Facebook
                    </>
                  )}
                </button>
              </div>
            </form>
            <button
              type="button"
              className="btn"
            >
              Need an account?<a href="/signup" className="link" onClick={() => navigate("/signup")}> Sign Up</a> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
