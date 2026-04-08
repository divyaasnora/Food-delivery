import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        alert("Login successful");
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate('/')
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
    }
  }; // ✅ FIX: Properly closed handleSubmit here

  const handleChange = (e) => {
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="container mt-5">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <Link to="/createuser" className="m-3 btn btn-danger">
          Please Sign Up
        </Link>
      </form>
    </div>
  );
}