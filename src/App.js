import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./pages/Main";
import DashBoard from './pages/DashBoard';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
