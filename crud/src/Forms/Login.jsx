import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Sending data:", values);
      const res = await axios.post("http://localhost:8080/login", values);

      if (res.data === "Login successfull") {
        console.log("User logged in successfully");
        alert("You are logged in successfully");
        navigate("/"); // Redirect to the dashboard or another page
      } else {
        console.log("Login failed: ", res.data);
        alert("Login failed: " + res.data);
      }
    } catch (err) {
      alert("Invalid user");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-400 h-screen">
      <div className="p-3 bg-white w-[28rem] rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter you Email"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 gap-3 flex flex-row items-center">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success rounded-lg bg-slate-400 text-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
