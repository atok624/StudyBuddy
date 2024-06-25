import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase auth functions

function Header() {
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    const auth = getAuth(); // Get the Firebase authentication instance

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="header--wrapper">
      <div className="header--title">
        <h2>
          Study <span>Buddy</span>
        </h2>
      </div>

      <div className="search--box">
        <i className="fa-solid fa-search"></i>
        <input type="text" placeholder="Search" />
      </div>
      <div className="user--info">
        {user ? (
          <>
            <img src={user.photoURL} alt="User" />
            <span>{user.displayName}</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </div>
    </div>
  );
}

export default Header;
