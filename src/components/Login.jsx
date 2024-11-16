import React, { useState } from "react";
import "../styles/Login.scss";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [otp, setOtp] = useState("");

  // const handleName =(e) =>{
  //        setName(e.target.value)
  // }

  //handling Sign Up
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://staging-be-ecom.techserve4u.com/api/user/signup",
        { name, email, password }
      );

      console.log("response", response.data);

      if (response.data.isOtpSend) {
        setIsOtpSend(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handling OTP
  const handleOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://staging-be-ecom.techserve4u.com/api/user/verifyotp",
        { otp, email }
      );

      console.log("response after sending theOTP", response);

      if (response.data.success) {
        alert("Registered successfully!");
        setIsOtpSend(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-form-container">
      {isOtpSend ? (
        <div>
          <h2>Verify OTP</h2>
          <form onSubmit={handleOTP} className="login-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button type="submit">Send & Verify</button>
          </form>
        </div>
      ) : (
        <div className="login-form-box">
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Sign up</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
