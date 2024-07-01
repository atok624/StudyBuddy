// src/components/ExpenseSummary.js
import React, { useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';

const ExpenseSummary = () => {
  const { expenses } = useContext(ExpenseContext);

  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);
  const averageExpense = (totalExpenses / expenses.length || 0).toFixed(2);

  return (
    <div>
      <h3>Expense Summary</h3>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>Average Expense: ${averageExpense}</p>
      <p>Total Expenses Count: {expenses.length}</p>
    </div>
  );
};

export default ExpenseSummary;
