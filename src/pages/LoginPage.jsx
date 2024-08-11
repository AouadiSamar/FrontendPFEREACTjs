import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../components/Axios';
import './LoginPage.css';
import logopay from './ola.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const LOGIN_URL = '/api/v1/users/login/2fa/';
      const response = await AxiosInstance.post(LOGIN_URL, { email, password });

      if (response.data.message) {
        setStep(2);
      }
    } catch (error) {
      let errorMessage = 'Email or password is incorrect!';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || errorMessage;
      }
      setErrorMessage(errorMessage);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    try {
      const VERIFY_URL = '/api/v1/users/login/verify/';
      const response = await AxiosInstance.post(VERIFY_URL, { secret_code: verificationCode });

      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        navigate('/user');
      } else {
        setErrorMessage('Verification code is incorrect!');
      }
    } catch (error) {
      let errorMessage = 'Verification code is incorrect!';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || errorMessage;
      }
      setErrorMessage(errorMessage);
    }
  };

  const handleResetEmailClick = () => {
    navigate('/send-reset-email');
  };

  return (
    <div className="login-page">
      <div className="header-logo">
        <img src={logopay} alt="Paymee Logo" className="paymee-logo" />
      </div>
      <div className="login-container">
        <div className="login-form-container">
          <h2 className="login-title">Login</h2>
          {errorMessage && <div className="login-error">{errorMessage}</div>}

          {step === 1 && (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <span className="forgot-password" onClick={handleResetEmailClick}>Forgot Password</span>
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerify} className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">Verify</button>
            </form>
          )}
        </div>
        <div className="login-footer">
          {/* Footer content if needed */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
