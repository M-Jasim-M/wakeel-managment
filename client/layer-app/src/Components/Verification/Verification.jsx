import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import verimg from '../../Assets/Images/login.svg'
import logo from '../../Assets/Images/verify.svg'

import './Verification.css'

function Verification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();


  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the verification code to the backend
      const response = await axios.post('http://localhost:5000/verify', {
        code: verificationCode,
      });

      if (response.data.success) {
        // Verification was successful, handle as needed (e.g., redirect)
        console.log('Verification successful');
        alert("verification successful")
        navigate('/login')
      } else {
        setErrorMessage('Invalid verification code. Please try again.');
        alert("please veify your email")
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert(error)
      setErrorMessage("please verify your email")
    }
  };

  const gotohome = ()=>{
    navigate("/")
  }
  return (
    <div className="vmain">

<div className="verifyleft">
<div className='containall'>
      <div><img src={logo} alt="" /> Verification Code</div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form>
        <label htmlFor="verificationCode">Enter 6-digit code:</label><br />
        <input
          type="text"
          id="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          maxLength={6} // Enforce a maximum length of 6 characters
        />
        
      </form>
      <div><NavLink to='/resand'>Resand verify email</NavLink></div>
    </div>
    <div className='buttons'> <button onClick={gotohome}>Cancal</button> <button onClick={handleVerificationSubmit}>Verify</button></div>
</div>

<div className="verifyright">
  <img src={verimg} alt="" />
</div>
    </div>
  );
}

export default Verification;
