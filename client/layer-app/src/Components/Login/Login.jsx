import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import login from '../../Assets/Images/login.svg'
import icon from '../../Assets/Images/login2.png'

import './Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Check if "Remember Me" is enabled in local storage
    const rememberMeEnabled = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(rememberMeEnabled);

    // If enabled, load the stored email from local storage
    if (rememberMeEnabled) {
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    // Toggle the "Remember Me" checkbox and update local storage accordingly
    setRememberMe(!rememberMe);
    localStorage.setItem('rememberMe', (!rememberMe).toString());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
        userType,
      });

      if (response.data.success) {
        // Handle successful login
        console.log('Login successful' + response.data);
        localStorage.setItem('userSession', JSON.stringify(response.data));
        // const userEmail = response.data.data.email; // Access the email from the response data
        const userType = response.data.user.userType; // Access the userType from the response data
        console.log('User Type:', userType);
        if (userType === 'layer')  {
          navigate('/dash'); // Redirect to '/dash' if userType is 'layer'
        } else {
          navigate('/cdash'); // Redirect to '/cdash' if userType is not 'layer'
        }
        // console.log('User Email:', userEmail);
        console.log(response.data)
      } else {
        // Handle login failure
        console.error('Login failed');
        alert('Please verify the email address');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Please verify your email address');
    }

    // If "Remember Me" is enabled, store the email in local storage
    if (rememberMe) {
      localStorage.setItem('email', email);
    } else {
      // If "Remember Me" is disabled, remove the email from local storage
      localStorage.removeItem('email');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // If the Enter key is pressed, prevent the default form submission and trigger the login
      e.preventDefault();
      handleLogin(e);
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <>
      <div className="lmain">
       <div className="loginleft">
    <div className='formdata'>

    <div><img src={icon} alt="" /> Login</div>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className='iconcontain'>
          <input
            type={showPassword ? 'password' : 'text'}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown} // Listen for Enter key press
          />
          <i onClick={togglePassword} className="fa-solid fa-eye"></i>
        </div>

        <div className='admainlabel'>
          <label>
            <input
              type="radio"
              value="client"
              checked={userType === 'client'}
              onChange={handleUserTypeChange}
            />
            Admain
          </label>
          <label>
            <input
              type="radio"
              value="layer"
              checked={userType === 'layer'}
              onChange={handleUserTypeChange}
            />
            Client
          </label>
          </div>
          <div className='forget'>
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Remember Me
          </label>
          <NavLink to='/forgot'>Forgot Password?</NavLink></div>
       
        <button onClick={handleLogin}>Login</button>
       

    </div>
    <div className='already'>Don't have an account? <NavLink to="/">Sign up</NavLink> </div>
       </div>

<div className="loginright">
<img src={login} alt="" />
</div>

      </div>
    </>
  );
}

export default Login;
