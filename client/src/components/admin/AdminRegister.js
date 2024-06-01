import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

const AdminRegister = () => {
  const nav = useNavigate();
  const initialValues = {
    email: "",
    username: "",
    password: "",
    cpassword: "",
    pass_key: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  console.log(formErrors);
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
      await axios.post("/admin/register ", formValues);
      nav("/ngo/admin/login");
    } catch (error) {
      setFormErrors(error.response.data);
    }
  };

  return (
    <>
      <Header/>
    <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-600 h-full">
      <div className="w-fit m-auto xl:ml-16 mt-4 rounded-2xl h-screen">
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-5 bg-white rounded-2xl"
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
              <Link to="/ngo/admin/login" className="text-cyan-600 font-normal">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <img src="/img2.jpg" className="absolute top-32 right-24 h-5/6 rounded-xl hidden xl:block" alt="" />
    </div>
    </>
  );
};

export default AdminRegister;
