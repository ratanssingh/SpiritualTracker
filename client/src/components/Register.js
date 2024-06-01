import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const Register = () => {
  const nav = useNavigate();
  const initialValues = {
    email: "",
    username: "",
    password: "",
    cpassword: "",
    phone: "",
    pass_key: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  const postData = async () => {
    try {
      await axios.post("/register", formValues);
      nav("/user/login");
    } catch (error) {
      setFormErrors(error.response.data);
    }
  };

  return (<>
  <Header/>
    <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-600 h-full">
      <div className="w-fit m-auto xl:ml-16 mt-4 border shadow-2xl shadow-cyan-400 rounded-2xl">
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-5 bg-white rounded-2xl h-full"
        >
          <div className="space-y-2">
            <label className="text-lg font-semibold">Email</label>
            <input
              required
              onChange={handleChange}
              className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none  focus:border-cyan-500"
              type="email"
              name="email"
            />
            <p className="text-red-600">{formErrors.in1?.email}</p>
          </div>
          <div className="space-y-2">
            <label className="text-lg font-semibold">Username</label>
            <input
              required
              onChange={handleChange}
              className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none  focus:border-cyan-500"
              type="text"
              name="username"
            />
            <p className="text-red-600">{formErrors.in2?.username}</p>
          </div>
          <div className="space-y-2">
            <label className="text-lg font-semibold">Password</label>
            <input
              required
              onChange={handleChange}
              className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none  focus:border-cyan-500"
              type="password"
              name="password"
              minLength={6}
              placeholder="Enter atleast 6 characters"
            />
            <p className="text-red-600"> {formErrors?.error}</p>
          </div>
          <div className="space-y-2">
            <label className="text-lg font-semibold">Confirm Password</label>
            <input
              required
              onChange={handleChange}
              className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none  focus:border-cyan-500"
              type="password"
              name="cpassword"
            />
          </div>
          <div className="space-y-2">
            <label className="text-lg font-semibold">Phone</label>
            <input
              required
              onChange={handleChange}
              className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none  focus:border-cyan-500"
              type="text"
              name="phone"
              maxLength={10}
              pattern="[1-9]{1}[0-9]{9}"
              placeholder="Please enter your phone number"
            />
          </div>
          <div className="space-y-2">
            <label className="text-lg font-semibold">
              Enter your favourite teacher's name
            </label>
            <input
              required
              onChange={handleChange}
              className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none  focus:border-cyan-500"
              type="text"
              name="pass_key"
            />
          </div>
          <div className="space-y-4">
            <button className="bg-cyan-500 w-full p-2 text-white font-semibold text-lg rounded-lg transition ease-in-out delay-100 hover:bg-cyan-600">
              Register
            </button>
            <p className="font-semibold">
              Already registered?{" "}
              <Link to="/user/login" className="text-cyan-600 font-normal">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <img src="/img2.jpg" className="absolute top-32 z-0 right-24 h-full rounded-xl hidden xl:block" alt="" />
    </div></>
  );
};

export default Register;
