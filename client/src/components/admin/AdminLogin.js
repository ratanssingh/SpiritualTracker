import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";

const AdminLogin = () => {
  const nav = useNavigate();
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState([]);

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
      const res = await axios.post("/admin/login", formValues);
      localStorage.setItem("token", res.data.token);
      nav("/adminpanel");
    } catch (error) {
      setFormErrors(error.response.data.error);
    }
  };

  return (
    <>
      <Header />
      <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-600 h-screen">
        <div className="w-fit m-auto  xl:ml-80  border mt-14  shadow-2xl shadow-cyan-400 rounded-2xl">
          <form
            onSubmit={handleSubmit}
            className="p-5 space-y-5 bg-white rounded-2xl h-96"
          >
            <div className="space-y-2">
              <label className="text-lg font-semibold">Username</label>
              <input
                required
                onChange={handleChange}
                className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                type="text"
                name="username"
                minLength={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-lg font-semibold">Password</label>
              <input
                required
                onChange={handleChange}
                className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                type="password"
                name="password"
                minLength={4}
              />
            </div>
            <p className="text-red-600">{formErrors}</p>
            <div className="space-y-4">
              <Link to={"/ngo/admin/forgot-password"}>
                <p className="text-cyan-500 transition ease-in-out delay-100 hover:text-cyan-700">
                  Forgot password?
                </p>
              </Link>
              <button className="bg-cyan-500 w-full p-2 text-white font-semibold text-lg rounded-lg transition ease-in-out delay-100 hover:bg-cyan-600">
                Login
              </button>
              <p className="font-semibold">
                Don't have account?{" "}
                <Link to="/ngo/admin/reg" className="text-cyan-600 font-normal">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
        <img src="/img2.jpg" className="hidden xl:block absolute top-40 z-0 right-80 h-96 rounded-xl" alt="" />
      </div>
    </>
  );
};

export default AdminLogin;
