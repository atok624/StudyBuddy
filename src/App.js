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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
          <Route path="/note" element={<PrivateRoute><Note /></PrivateRoute>} />
          <Route path="/task" element={<PrivateRoute><Task /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
