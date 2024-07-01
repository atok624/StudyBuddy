// src/App.js

import React from 'react';
import { ExpenseProvider } from './ExpenseContext';
import { Col, Container, Row } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import BudgetForm from './BadgetForm';
import ExpenseSummary from './ExpenseSummary';
import FilterSortControls from './FilterSortControls';


const App = () => {
  return (
    <ExpenseProvider>
      <Container>
        <Row>
          <Col>
            <h1>Expense Tracker</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <BudgetForm />
            <ExpenseForm />
          </Col>
          <Col md={6}>
            <FilterSortControls />
            <ExpenseSummary />
            <ExpenseList />
          </Col>
        </Row>
      </Container>
    </ExpenseProvider>
  );
};

export default App;
