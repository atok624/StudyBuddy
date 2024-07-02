import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard.css";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";
import Card from "../../component/Card";
import Table from "../../component/Table";

function DashBoard() {
  const cardColors = ["#FFADB0", "#CBC3E3", "#A7F1A7sDAXC", "#7CC1D7"]; // Example colors

  return (
    <div className="App">
      <Sidebar />
      <div className="main--content">
        <Header />
        <div className="card--container">
          <h3 className="main--title">Today's data</h3>
          <div className="card--wrapper">
            <Link to="/expense" className="no-underline">
              {" "}
              {/* Wrap with Link component */}
              <Card
                title="Expense Planner"
                amount="$1,234.56"
                icon="fa-solid fa-money-check-dollar icon red"
                backgroundColor={cardColors[0]}
              />
            </Link>
            <Link to="/note" className="no-underline">
              <Card
                title="Note"
                amount="$1,234.56"
                icon="fa-solid fa-book icon purple"
                backgroundColor={cardColors[1]}
              />
            </Link>
            <Link to="/calendar" className="no-underline">
              <Card
                title="Calendar"
                amount="$1,234.56"
                icon="fa-solid fa-calendar icon green"
                backgroundColor={cardColors[2]}
              />
            </Link>
            <Link to="/task" className="no-underline">
              <Card
                title="Study Planner"
                amount="$1,234.56"
                icon="fa-solid fa-list-check icon blue"
                backgroundColor={cardColors[3]}
              />
            </Link>
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
