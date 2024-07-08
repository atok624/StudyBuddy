import React from 'react';
import "./Main.css"
import VideoBG from '../assests/VideoBG.mp4'
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <div className="overlay"></div>
      <div>
        <video src={VideoBG} autoPlay loop muted/>
      </div>
      <div className="content text-center">
        <h1 className="display-3">Studdy-Buddy</h1>
        <p className="lead">Welcome to Study-Buddy, your number one app to help you stay organized <br /> and succeed in your academic journey!</p>
        <div className="buttons mt-4">
          <button className="btn btn-primary btn-lg mx-2" onClick={() => navigate('/signin')}>Sign In</button>
          <button className="btn btn-outline-light btn-lg mx-2" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Main;