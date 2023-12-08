import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './signupValidation';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
  
    const noErrors = Object.values(validationErrors).every((error) => !error);
  
    if (noErrors) {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          console.log("Signup successful. Redirecting...");
          navigate('/');  // Redirect immediately upon successful form submission
        })
        .catch((err) => console.log(err));
    }
  };

  // useEffect(() => {
  //   const noErrors = Object.values(errors).every((error) => !error);

  //   if (noErrors) {
  //     axios.post('http://localhost:8081/signup', values)
  //       .then(res => {
  //         console.log("Signup successful. Redirecting...");
  //         setTimeout(() => {
  //           navigate('/');  // Should trigger navigation after a delay
  //         }, 5000);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [errors, values, navigate]);

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100 '>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign Up</h2>
        <form action="" method="post" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="name"><strong>Name</strong></label>
            <input type="name" placeholder='Enter Name'
              name='name'
              onChange={handleInput}
              className='form-control rounded-0' />
            {errors.name && <p className="error-message text-danger">{errors.name}</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              className='form-control rounded-0' />
            {errors.email && <p className="error-message text-danger">{errors.email}</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter Password'
              name='password'
              onChange={handleInput}
              className='form-control rounded-0' />
            {errors.password && <p className="error-message text-danger">{errors.password}</p>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
          <p>You agree to our terms and policies</p>
          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
