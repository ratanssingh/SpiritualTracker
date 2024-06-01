import React, { useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const SubmittedForm = () => {
  const nav = useNavigate();
  useEffect(() => {
    isUserAuth();
  }, []);

  const isUserAuth = async () => {
    try {
      const res = await axios.get("/isFormSubmitted", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.submitted === false) {
        nav("/");
      }
    } catch (error) {
      nav("/user/login");
    }
  };

  return (
    <>
      <Header />
      <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-600 h-screen">
        <div className="w-fit m-auto border-gray-200 border mt-14 shadow-2xl shadow-cyan-400 p-2 text-cyan-700 bg-white">
          <span className="flex items-center gap-2">
            <ExclamationCircleIcon className="h-6 w-6" /> Record successfully
            submitted{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default SubmittedForm;
