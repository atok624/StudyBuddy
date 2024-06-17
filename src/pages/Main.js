import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className="container-fluid welcome-page">
      <div className="row">
        <div className="col-md-6 welcome-content">
          <div className="jumbotron">
            <h1 className="display-3">Welcome to Kampus Kampanion</h1>
            <p className="lead">Your go-to platform for campus life and community</p>
            <hr className="my-4" />
            <p>Get started by signing in or signing up below.</p>
            <p className="lead">
              <Link to="/signin" className="btn btn-primary btn-lg">Sign In</Link>{' '}
              <Link to="/signup" className="btn btn-secondary btn-lg">Sign Up</Link>
            </p>
          </div>
        </div>
        <div className="col-md-6 welcome-image">
          <img src="https://via.placeholder.com/600x400" alt="Campus Life" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Main;