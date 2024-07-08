import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard.css";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";
import Card from "../../component/Card";
import Table from "../../component/Table";

function DashBoard() {
  const cardColors = ["#FFADB0", "#CBC3E3", "#A7F1A7", "#7CC1D7"]; // Example colors

  // State for search input and filtered cards
  const [searchInput, setSearchInput] = useState("");

  // Card data (you can replace this with your actual data)
  const cards = [
    {
      title: "Expense Planner",
      amount: "$1,234.56",
      icon: "fa-solid fa-money-check-dollar icon red",
      backgroundColor: cardColors[0],
      link: "/expense",
    },
    {
      title: "Note",
      amount: "4 notes Available",
      icon: "fa-solid fa-book icon purple",
      backgroundColor: cardColors[1],
      link: "/note",
    },
    {
      title: "Calendar",
      amount: "Algebra 101 on Monday",
      icon: "fa-solid fa-calendar icon green",
      backgroundColor: cardColors[2],
      link: "/calendar",
    },
    {
      title: "Study Planner",
      amount: "2 study session Today",
      icon: "fa-solid fa-list-check icon blue",
      backgroundColor: cardColors[3],
      link: "/task",
    },
  ];

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter cards based on search input
  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="App">
      <Sidebar />
      <div className="main--content">
        <Header searchInput={searchInput} onSearchInputChange={handleSearchInputChange} />
        <div className="card--container">
          <h3 className="main--title">Today's data</h3>
          <div className="card--wrapper">
            {filteredCards.map((card, index) => (
              <Link to={card.link} className="no-underline" key={index}>
                <Card
                  title={card.title}
                  amount={card.amount}
                  icon={card.icon}
                  backgroundColor={card.backgroundColor}
                />
              </Link>
            ))}
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
