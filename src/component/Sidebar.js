import React from 'react';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signup")
      console.log('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/images/kk-removebg-preview.png" alt="Logo" />
      </div>
      <ul className="menu">
        <li className="active">
          <a href="#"><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></a>
        </li>
        <li>
          <a href="#"><i className="fas fa-user"></i><span>Profile</span></a>
        </li>
        <li>
          <a href="#"><i className="fas fa-briefcase"></i><span>Careers</span></a>
        </li>
        <li>
          <a href="#"><i className="fas fa-question-circle"></i><span>FAQ</span></a>
        </li>
        <li>
          <a href="#"><i className="fas fa-star"></i><span>Testimonials</span></a>
        </li>
        <li>
          <a href="#"><i className="fas fa-cog"></i><span>Settings</span></a>
        </li>
        <li className="logout">
          <a href="/signin" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i><span>Logout</span></a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
