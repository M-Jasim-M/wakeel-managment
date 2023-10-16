import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Resend.css'
import resimg from '../../Assets/Images/login.svg'

function ResendVerification() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const handleResendClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/resend-verification', {
        email,
      });

      if (response.data.success) {
        setSuccessMessage('New verification code sent. Please check your email.');
        navigate("/verify")
      } else {
        setErrorMessage('User not found. Make sure you entered the correct email.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred while resending the verification code.');
    }
  };

  return (
    <div className='resmain'>
    
    <div className="resaleft">
    <h2>Resend Verification Code</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <label htmlFor="email">Enter your email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResendClick}>Resend Verification Code</button>
    </div>

    <div className="resaright">
<img src={resimg} alt="" />
    </div>
    </div>
  );
}

export default ResendVerification;
