import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ExpenseProvider } from './pages/expense/ExpenseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </React.StrictMode>
);