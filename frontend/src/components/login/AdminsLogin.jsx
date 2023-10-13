import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/login.css";


function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [patternError, setPatternError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Verify the email correct pattern
    if (!/^[A-Za-z@.0-9_-]+$/.test(values.email)) {
      setPatternError("Please enter a valid email with A-Z, a-z, 0-9 or special characters: '@-_.'");
      return;
    } else {
      setPatternError("");
    }

    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:4000/admins-login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded border loginForm" style={{ width: "350px" }}>
        <div className="text-danger text-center">
          {error && error}
          <br />
          {patternError && patternError}
        </div>
        <h2 className="text-center">Admin login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className="form-control rounded-0"
              autoComplete="on"
              required
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              autoComplete="off"
              required
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log in
          </button>
          <p className="text-center mt-2">Terms and policies</p>
        </form>
      </div>
    </div>
  );
}

export default Login;