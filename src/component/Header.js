import React from "react";

function Header() {
  return (
    <div className="header--wrapper">
      <div className="header--title">
        
        <h2>Study <span>Buddy</span></h2>
      </div>

      <div className="search--box">
        <i className="fa-solid fa-search"></i>
        <input type="text" placeholder="Search" />
      </div>
      <div className="user--info">
        <img src="./84607674.jpg" alt="User" />
        <span>John Doe</span>
      </div>
    </div>
  );
}

export default Header;
