import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Dashboard.css';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import Card from '../../component/Card';
import Table from '../../component/Table';

function DashBoard() {
  const cardColors = ['#FFADB0', '#CBC3E3', '#A7F1A7sDAXC', '#7CC1D7']; // Example colors

  return (
    <div className="App">
      <Sidebar />
      <div className="main--content">
        <Header />
        <div className="card--container">
          <h3 className="main--title">Today's data</h3>
          <div className="card--wrapper">
            <Link to="/note"> {/* Wrap with Link component */}
              <Card title="Payment Amount" amount="$1,234.56" icon="fas fa-dollar-sign icon red" backgroundColor={cardColors[0]} />
            </Link>
            <Link to="/task">
            <Card title="Payment Amount" amount="$1,234.56" icon="fas fa-list icon purple" backgroundColor={cardColors[1]} />
            </Link>
            <Card title="Payment Amount" amount="$1,234.56" icon="fas fa-users icon green" backgroundColor={cardColors[2]} />
            <Card title="Payment Amount" amount="$1,234.56" icon="fas fa-check icon blue" backgroundColor={cardColors[3]} />
          </div>
        </div>
        <div className="tabular--wrapper">
          <h3 className="main--title">Finance Data</h3>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
