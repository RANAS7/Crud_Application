import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value], // Remove the square brackets around event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Sending data:", values);
      const res = await axios.post("http://localhost:8080/signUp", values);
      console.log("Response from server:", res.data);
      alert("You are registered successfully");
      console.log("User registed successfully");
      navigate("/");
      console.log(values);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-400 h-screen">
      <div className="p-3 bg-white w-[28rem] rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="text-center" action="post">
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your Address"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              name="contact"
              placeholder="Enter your Contact"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your Email"
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
            className="btn btn-success bg-slate-400 text-black"
          >
            Sign Up
          </button>
        </form>
        <div className="gap-2 flex flex-row ">
          <span>If you are already registered</span>
          <Link to="/login" className="font-semibold text-purple-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
