// src/components/ExpenseList.js
import React, { useContext } from 'react';
import ExpenseItem from './ExpenseItem';
import { ExpenseContext } from './ExpenseContext';

const ExpenseList = () => {
  const { expenses } = useContext(ExpenseContext);

  return (
    <div>
      {expenses.map(expense => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseList;
