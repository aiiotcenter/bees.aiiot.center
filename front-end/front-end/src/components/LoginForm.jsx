import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { ButtonWrapper, Direction, Error, ForgetWrapper, Form, Input, InputBox, Label, Register } from '../style/login/style';
import Button from '@mui/material/Button';


export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const dummyUsername = 'admin';
  const dummyPassword = 'admin123';

  const navigate = useNavigate(); // Hook to navigate after login

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (username === '' || password === '') {
      setError('Please fill in both fields.');
      return;
    }

    if (username !== dummyUsername || password !== dummyPassword) {
      setError('Invalid username or password.');
      return;
    }

    // Simulate login success
    setError('');
    // alert('Login successful!');

    // Optionally handle "Keep me logged in" logic
    if (keepLoggedIn) {
      console.log('User opted to stay logged in');
    }

    // Reset form fields
    setUsername('');
    setPassword('');

    // Redirect to the HomePage after successful login
    navigate('/dashboard');
  };

  return (
    <>
      <Form onSubmit={handleSubmit} method="post">
        <InputBox>
          <Label>User Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
        </InputBox>
        <InputBox>
          <Label>Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </InputBox>
        <div className="login-session">
          <div className="keep-login checkbox">
            {/* 
            <input
              id="checkbox1"
              type="checkbox"
              name="keepLoggedIn"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
            />
            <label htmlFor="checkbox1">Keep me logged in</label>
            */}
          </div>
          <ForgetWrapper>
            {/* <Direction to="/forgot-password">Forgot Password</Direction> */}
          </ForgetWrapper>
        </div>
        <Button type="submit" id="rippleButton" sx={{
          backgroundColor: '#6f2036',
          color: '#fff',
          '&:hover': {
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            background: '#980a25',
          },
        }} style={{width:'100%', marginBottom:'10px'}}>Login</Button>

        {error && <Error className="error">{error}</Error>}
        {/* <Register>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </Register> */}
      </Form>
    </>
  );
}
