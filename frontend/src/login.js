import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './loginValidation';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const [errors, setErrors] = useState([]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    const noErrors = Object.values(validationErrors).every((error) => !error);

    if (noErrors) {
      axios.post('http://localhost:8081/login', values)
      .then(res => {
        console.log("Login successful. Redirecting...");
        navigate('/home');
      })
      .catch((err) => {
        console.log("Login error:", err);
      });
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100 '>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Login</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.email && <p className="error-message text-danger">{errors.email}</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.password && <p className="error-message text-danger">{errors.password}</p>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
          <p>You agree to our terms and policies</p>
          <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
