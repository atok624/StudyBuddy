// src/components/FilterSortControls.js
import React, { useContext, useState } from 'react';
import { ExpenseContext } from './ExpenseContext';
import { Form, Button } from 'react-bootstrap';

const FilterSortControls = () => {
  const { expenses, setFilteredExpenses } = useContext(ExpenseContext);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  const filterExpenses = () => {
    let filtered = expenses;

    if (categoryFilter) {
      filtered = filtered.filter(expense => expense.category === categoryFilter);
    }

    if (sortCriteria === 'amount') {
      filtered = filtered.sort((a, b) => a.amount - b.amount);
    } else if (sortCriteria === 'date') {
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredExpenses(filtered);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Filter by Category</Form.Label>
        <Form.Control as="select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Sort by</Form.Label>
        <Form.Control as="select" value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
          <option value="">None</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </Form.Control>
      </Form.Group>
      <Button onClick={filterExpenses}>Apply</Button>
      <Button onClick={filterExpenses}>Apply</Button>
    </Form>
  );
};

export default FilterSortControls;

