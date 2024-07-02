// src/App.js

import React from "react";
import { ExpenseProvider } from "./ExpenseContext";
import { Col, Container, Row } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import BudgetForm from "./BadgetForm";
import ExpenseSummary from "./ExpenseSummary";
import FilterSortControls from "./FilterSortControls";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";
import './Expense.css'

const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="main--content">
        <Header />
        <ExpenseProvider>
          <Container>
            <Row>
              <Col>
                <h1>Expense Tracker</h1>
              </Col>
            </Row>
            <Row className="second--container">
              <Col md={7} className="form">
                <BudgetForm />
                <ExpenseForm />
              </Col>
              <Col md={4} className="list">
                <FilterSortControls />
                <ExpenseSummary />
                <ExpenseList />
              </Col>
            </Row>
          </Container>
        </ExpenseProvider>
      </div>
    </div>
  );
};

export default App;
