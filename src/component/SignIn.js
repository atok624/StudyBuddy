import "./Login.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, provider, facebookProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom"

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    setIsLoadingGoogle(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google user signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message);
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const signInWithFacebook = async () => {
    setIsLoadingFacebook(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook user signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
      setError(error.message);
    } finally {
      setIsLoadingFacebook(false);
    }
  };

  const signInWithEmail = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    setIsLoadingEmail(true);
    setError(null);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Email user signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Email:", error);
      setError(error.message);
    } finally {
      setIsLoadingEmail(false);
    }
  };

  return (
    <div className="contain">
      <div className="row align-items-center row--first rounded">
        <div className="col-md-6 text-center">
          <img src="/images/kk-removebg-preview.png" alt="" className="first--logo"/>
          <h2>Study Buddy</h2>
          <p>Your number one app to help you stay organized</p>
        </div>
        <div className="col-md-6 p-0">
          <div className="card p-4 shadow">
            <h2 className="mb-2 text-center">Sign in</h2>
            {(isLoadingEmail || isLoadingFacebook || isLoadingGoogle) && <p>Loading...</p>}
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
              <div>
              <h6 className="text-center mb-1">
                <a href="#" target="_blank">
                  Forgot password?
                </a>
              </h6>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block w-100 p-1"
                  disabled={isLoadingEmail || isLoadingGoogle || isLoadingFacebook}
                >
                  {isLoadingEmail ? "Signing In..." : "Sign In with Email"}
                </button>
              </div>
              <hr />

              <div>
                <button
                  type="button"
                  className="btn btn-block w-100 p-1 border border-secondary bold-border"
                  onClick={signInWithGoogle}
                  disabled={isLoadingEmail || isLoadingGoogle || isLoadingFacebook}
                >
                  {isLoadingGoogle ? (
                    "Signing In..."
                  ) : (
                    <>
                      <i className="fa-brands fa-google"></i> Sign In With Google
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-block w-100 p-1 border border-primary bold-border"
                  onClick={signInWithFacebook}
                  disabled={isLoadingEmail || isLoadingGoogle || isLoadingFacebook}
                >
                  {isLoadingFacebook ? (
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
              Need an account?<span onClick={() => navigate("/signup")} className="link"> Sign Up</span> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
