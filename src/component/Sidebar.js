import React, { useState } from 'react';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

function Sidebar() {
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(window.location.pathname); // Get initial active path

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signup");
      console.log('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleClick = (path) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/images/kk-removebg-preview.png" alt="Logo" />
      </div>
      <ul className="menu">
        <li className={activePath === "/dashboard" ? "active" : ""}>
          <a onClick={() => handleClick("/dashboard")}><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></a>
        </li>
        <li className={activePath === "/task" ? "active" : ""}>
          <a onClick={() => handleClick("/task")}><i class="fa-solid fa-list-check"></i><span>Planner</span></a>
        </li>
        <li className={activePath === "/note" ? "active" : ""}>
          <a onClick={() => handleClick("/note")}><i class="fa-solid fa-book"></i><span>Note</span></a>
        </li>
        <li className={activePath === "/expense" ? "active" : ""}>
          <a onClick={() => handleClick("/expense")}><i class="fa-solid fa-money-check-dollar"></i><span>Expense</span></a>
        </li>
        <li className={activePath === "/calendar" ? "active" : ""}>
          <a onClick={() => handleClick("/calendar")}><i class="fa-solid fa-calendar"></i><span>Calendar</span></a>
        </li>
        <li className={activePath === "/reminder" ? "active" : ""}>
          <a onClick={() => handleClick("/reminder")}><i class="fa-solid fa-bell"></i><span>Reminder</span></a>
        </li>
        <li className="logout">
          <a onClick={() => { handleLogout(); navigate("/signin"); }}><i className="fas fa-sign-out-alt"></i><span>Logout</span></a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
