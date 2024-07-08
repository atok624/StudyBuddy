// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./pages/Main";
import PrivateRoute from './component/PrivateRoute';
import { AuthProvider } from './config/AuthContext';
import DashBoard from './pages/Dashboard/DashBoard';
import Note from './pages/notes/Note';
import Task from './pages/task/Task';
import Calendar from './pages/calendar/Calendar';
import { useState, useEffect } from 'react';
import Reminder from './pages/reminders/Reminder';
import Expense from './pages/expense/Expense';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        return Array.isArray(parsedTasks) ? parsedTasks : [];
      } catch (e) {
        console.error("Error parsing tasks from localStorage", e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const deleteTask = (taskToDelete) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete.id)
    );
  };

  const completeTask = (taskToComplete) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToComplete.id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = (taskToEdit) => {
    // Implement editing logic here if needed
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
          <Route path="/note" element={<PrivateRoute><Note /></PrivateRoute>} />
          <Route path="/task" element={<PrivateRoute><Task tasks={tasks} addTask={addTask} deleteTask={deleteTask} completeTask={completeTask} editTask={editTask} /></PrivateRoute>} />
          <Route path="/calendar" element={<PrivateRoute><Calendar tasks={tasks} /></PrivateRoute>} />
          <Route path="/expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
          <Route path="/reminder" element={<PrivateRoute><Reminder /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
