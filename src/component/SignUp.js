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
  const [image, setImage] = useState(null); // State for the image file
  const [isLoading, setIsLoading] = useState(false); // Track loading state
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
      setImage(e.target.files[0]); // Update the image state
    }
  };

  const signUpWithEmail = async (event) => {
    event.preventDefault();
    if (!image) {
      setError("Please upload an image.");
      return;
    }
    setIsLoading(true); // Start loading state
    setError(null); // Clear previous errors

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
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      {isLoading && <p>Loading...</p>} {/* Display loading indicator */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={signUpWithEmail}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
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
        <label htmlFor="file">
          <img
            className="avatar"
            src={avatar.url || "./avatar.png"}
            alt="User's Avatar"
          />
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleAvatar}
          accept="image/*" // Specify accepted file types
        />
        <button type="button" onClick={() => document.getElementById('file').click()}>Upload Image</button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up With Email"}
        </button>
      </form>
      <button onClick={() => navigate("/signin")}>
        Already have an account? Sign In
      </button>
    </div>
  );
};

export default SignUp;
