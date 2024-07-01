// src/components/ExpenseItem.js
import React, { useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';
import { Button, ListGroup } from 'react-bootstrap';

const ExpenseItem = ({ expense }) => {
  const { removeExpense } = useContext(ExpenseContext);

  return (
    <ListGroup.Item>
      <span>{expense.description}: ${expense.amount} (Category: {expense.category}, Date: {new Date(expense.date).toLocaleDateString()})</span>
      <Button variant="danger" onClick={() => removeExpense(expense.id)}>Remove</Button>
    </ListGroup.Item>
  );
};

export default ExpenseItem;
