import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [details, setDetails] = useState([]);
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const id = details[0]?.sno;
  const resetPassword = async () => {
    try {
      const res = await axios.post("/forgot-password", { email, name });
      console.log(res);
      setDetails(res.data.results);
      setChecked(true);
    } catch (error) {
      console.error("Error:", error);
      setMessage("User Not Found");
    }
  };
  const changePassword = async () => {
    try {
      await axios.post("/reset-password", { id, pass });
      nav("/user/login");
    } catch (error) {
      console.error("Error:", error);
      setMessage("User Not Found");
    }
  };
  return (
    <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-600 h-screen">
      <div className="w-fit p-5 space-y-5 m-auto border mt-14 bg-white  shadow-2xl shadow-cyan-400 rounded-md">
        {checked ? (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-lg font-semibold">New Password</label>
              <input
                required
                onChange={(e) => setPass(e.target.value)}
                className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                type="password"
                name="username"
                minLength={3}
              />
            </div>
            <div className="space-y-4">
              <button
                onClick={changePassword}
                className="bg-cyan-500 w-full p-2 text-white font-semibold text-lg rounded-lg transition ease-in-out delay-100 hover:bg-cyan-600"
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-lg font-semibold">Email</label>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                type="email"
                name="username"
                minLength={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-lg font-semibold">
                {" "}
                Enter your favourite teacher's name
              </label>
              <input
                required
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                type="email"
                name="username"
                minLength={3}
              />
            </div>
            <p className="text-red-600">{message}</p>
            <div className="space-y-4">
              <button
                onClick={resetPassword}
                className="bg-cyan-500 w-full p-2 text-white font-semibold text-lg rounded-lg transition ease-in-out delay-100 hover:bg-cyan-600"
              >
                Forgot Password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;
