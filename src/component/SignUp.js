import "./Login.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
      setImage(e.target.files[0]);
    }
  };

  const signUpWithEmail = async (event) => {
    event.preventDefault();
    if (!image) {
      setError("Please upload an image.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storage = getStorage();
      const imageRef = ref(storage, `profileImages/${result.user.uid}`);

      if (imageRef) {
        try {
          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          await updateProfile(result.user, {
            displayName: username,
            photoURL: imageUrl,
          });
          console.log("Email user signed up:", result.user);
          navigate("/signin");
        } catch (error) {
          console.error("Error uploading image:", error);
          setError("Error uploading image. Please try again.");
        }
      } else {
        setError("Error creating user. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up with Email:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contain">
      <div className="row align-items-center row--first rounded">
        <div className="col-md-6 p-0">
          <div className="card p-4 shadow">
            <h3 className="mb-1 text-center">Sign Up</h3>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={signUpWithEmail} className="centered-form">
              <div className="form-group d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center">
                <label htmlFor="file">
                  <img
                    className="avatar mb-1"
                    src={avatar.url || "./avatar.png"}
                    alt="User's Avatar"
                    style={{ cursor: "pointer" }}
                  />
                </label><br/>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={handleAvatar}
                  accept="image/*"
                />

                </div>
                
                <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className=" btn btn-secondary btn-block text-center w-50 upload_img p-0"
                  onClick={() => document.getElementById("file").click()}
                >
                  Upload Image
                </button>

                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="form-control"
                  required
                />
              </div>
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
              <button
                type="submit"
                className="btn btn-primary btn-block w-100"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up With Email"}
              </button>
            </form>
            <button
              type="button"
              className="btn"
            >
              Have an account already?<span onClick = {() => navigate("/signin")}  className="link"> Sign In</span>
            </button>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <img src="/images/kk-removebg-preview.png" alt="" className="img-fluid" />
          <h2>Study Buddy</h2>
          <p>Your number one app to help you stay organized</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
