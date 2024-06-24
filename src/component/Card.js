import React from 'react';

function Card({ title, amount, icon, backgroundColor }) {
  return (
    <div className="payment--card" style={{ backgroundColor: backgroundColor }}>
      <div className="card--header">
        <div className="amount">
          <span className="title">{title}</span>
          <span className="amount-value">{amount}</span>
        </div>
        <i className={icon}></i>
      </div>
      <span className="card-detail">**** **** **** 34</span>
    </div>
  );
}

export default Card;
