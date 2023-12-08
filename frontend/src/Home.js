

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">WELCOME TO ACCREDIAN</h1>
        <p className="lead">
          This is a simple home page for Accredian. You can customize it
          based on your requirements.
        </p>
        <hr className="my-4" />
        <p>
          Get started by exploring the different features of your app or
          navigate to other pages.
        </p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg mx-2" to="/" role="button">
            Login
          </Link>
          <Link className="btn btn-success btn-lg ml-3 mx-2" to="/signup" role="button">
            Signup
          </Link>
        </p>
      </div>
      <footer className="text-center mt-5">
        <p>&copy; {new Date().getFullYear()} ACCREDIAN</p>
      </footer>
    </div>
  );
};

export default Home;
