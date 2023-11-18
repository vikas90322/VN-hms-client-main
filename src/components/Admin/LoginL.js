import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'


const LoginL = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('form data ',formData);
      await axios.post('http://localhost:5000/api/insert',formData);
      alert('Saved Successfully');
      navigate('/doctor')
    } catch (error) {
      alert('Error while logging in', error);
    }
  }

  return (
    <div className='loginform-container'>
      <h2>Login</h2>
<form className='login-form' autoComplete='off' onSubmit={handleSubmit}>

<div className='form-group'>

  <input type='text' name='username' className='form-control'onChange={handleChange} required></input>
  <span></span>
  <label htmlFor='username' >User Name</label>
</div>
<div className='form-group'>
  
  <input type='password' name='password' className='form-control'onChange={handleChange} required></input>
  <span></span>
  <label htmlFor='password' >Password</label>
  </div>
  <div className='pass'>Forgot Password</div>
  <input type='submit' value='Login'></input>
  <div className='signup-link'>Not a member ?<a href='#'>Signup</a></div>


</form>



    </div>
  )
}

export default LoginL