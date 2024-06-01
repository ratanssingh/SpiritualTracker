import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { TimePicker } from "antd";
const UserForm = () => {
  const nav = useNavigate();
  const initialValues = {
    rounds: "",
    service: "",
    hear_time: "",
    speaker: "",
    read_time: "",
    author: "",
    attend: "",
    game: "",
    hrUp: "",
    minUp: "",
    typeUp: "",
    hrbed: "",
    minbed: "",
    typebed: "",
    userId: "",
    submit_date: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [readingTime, setReadingTime] = useState(null);
  const [hearingTime, setHearingTime] = useState(null);
  const [userDetails, setUserDetails] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [isFocused2, setIsFocused2] = useState(null);
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);
  const [error4, setError4] = useState(null);
  let today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = date + "-" + month + "-" + year;

  if (isSubmitted) {
    nav("/form_submitted");
  }
  useEffect(() => {
    isFormSubmitted();
  }, []);

  const isFormSubmitted = async () => {
    try {
      const res = await axios.get("/isFormSubmitted", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setIsSubmitted(res.data.submitted);
      setUserDetails(res.data.user);
    } catch (error) {
      nav("/user/login");
    }
  };

  const handleTimeChange1 = (time, timeString) => {
    setReadingTime(timeString);
  };
  const handleTimeChange2 = (time, timeString) => {
    setHearingTime(timeString);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    formValues.hear_time = hearingTime;
    formValues.read_time = readingTime;
    formValues.userId = userDetails;
    formValues.submit_date = currentDate;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!readingTime) {
      setError1("Please select a time.");
    } else if (!hearingTime) {
      setError1(null);
      setError2("Please select a time.");
    } else if (isFocused === null) {
      setError2(null);
      setError3("Please select a time.");
    } else if (isFocused2 === null) {
      setError3(null);
      setError4("Please select a time.");
    } else {
      setError4(null);
      postData();
    }
  };

  const postData = async () => {
    try {
      await axios.post("/postform", formValues);
      nav("/form_submitted");
    } catch (error) {
      // alert(error);
      console.log(error)
    }
  };

  const handleInputBlur1 = (id) => {
    setIsFocused(id);
  };
  const handleInputBlur2 = (id) => {
    setIsFocused2(id);
  };

  return (
    <>
      <Header />
      <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-600 h-full sm:h-screen">
        <div className="w-full xl:w-3/5 m-auto border-gray-200 border mt-14 shadow-2xl shadow-cyan-400 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="p-5 space-y-5 bg-white rounded-lg"
          >
            <div className="flex justify-evenly gap-5 flex-col sm:flex-row">
              <div className="sm:w-1/2 space-y-2">
                <label className="text-sm font-bold ">
                  {" "}
                  Rounds of Mahamantra Chanting
                </label>
                <input
                  onChange={handleChange}
                  required
                  className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                  type="number"
                  min={0}
                  max={100}
                  name="rounds"
                />
              </div>
              <div className="sm:w-1/2 space-y-2">
                <label className="text-sm font-bold ">Service Rendering</label>
                <input
                  onChange={handleChange}
                  required
                  className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                  type="text"
                  name="service"
                />
              </div>
            </div>
            <div className="flex justify-evenly gap-5 flex-col sm:flex-row">
              <div className="sm:w-1/2 space-y-2">
                <label className="text-sm font-bold ">Hearing Lecture</label>
                <div className="flex items-center gap-2">
                  <div>
                    <TimePicker
                      className="w-full p-2"
                      size="large"
                      name="hear_time"
                      placeholder="Hearing time"
                      changeOnBlur={true}
                      onChange={handleTimeChange2}
                    />
                    {error2 && <p className="text-red-600">{error2}</p>}
                  </div>
                  <div>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="speaker"
                      className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                      placeholder="Name of speaker"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="sm:w-1/2 space-y-2">
                <label className="text-sm font-bold ">Reading SP Book</label>
                <div className="flex items-center gap-2">
                  <div>
                    <TimePicker
                      className="w-full p-2"
                      size="large"
                      name="read_time"
                      placeholder="Reading time"
                      changeOnBlur={true}
                      onChange={handleTimeChange1}
                    />
                    {error1 && <p className="text-red-600">{error1}</p>}
                  </div>
                  <div>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="author"
                      className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                      placeholder="Author Name"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-evenly gap-5 flex-col sm:flex-row">
              <div className="sm:w-1/2 space-y-2 ">
                <label className="text-sm font-bold ">
                  Attending Chanting-Reading Sessions
                </label>
                <div className="flex gap-2 flex-col sm:flex-row w-fit">
                  <input
                    required
                    name="attend"
                    onClick={handleChange}
                    value="Everyday"
                    onBlur={() => handleInputBlur1(0)}
                    className={
                      isFocused === 0
                        ? "cursor-pointer border rounded-lg sm:w-20 p-2 border-cyan-400"
                        : "cursor-pointer border rounded-lg sm:w-20 p-2 border-gray-400 focus:border-2"
                    }
                    readOnly
                  />
                  <input
                    required
                    name="attend"
                    onClick={handleChange}
                    value="More than a day"
                    onBlur={() => handleInputBlur1(1)}
                    className={
                      isFocused === 1
                        ? "cursor-pointer border rounded-lg sm:w-full p-2 border-cyan-400"
                        : "cursor-pointer border rounded-lg sm:w-full p-2 border-gray-400 focus:border-2"
                    }
                    readOnly
                  />
                  <input
                    required
                    name="attend"
                    onClick={handleChange}
                    value="1 Day"
                    onBlur={() => handleInputBlur1(2)}
                    className={
                      isFocused === 2
                        ? "cursor-pointer border rounded-lg sm:w-20 p-2 border-cyan-400"
                        : "cursor-pointer border rounded-lg sm:w-20 p-2 border-gray-400 focus:border-2"
                    }
                    readOnly
                  />
                </div>
                {error3 && <p className="text-red-600">{error3}</p>}
              </div>
              <div className="sm:w-1/2 space-y-2">
                <label className="text-sm font-bold ">
                  Attending Weekend GAME Class
                </label>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input
                    onBlur={() => handleInputBlur2(1)}
                    name="game"
                    onClick={handleChange}
                    className={
                      isFocused2 === 1
                        ? "cursor-pointer border rounded-lg sm:w-full p-2 border-cyan-400"
                        : "cursor-pointer border rounded-lg sm:w-full p-2 border-gray-400 focus:border-2"
                    }
                    value="Yes"
                    readOnly
                  />
                  <input
                    onBlur={() => handleInputBlur2(2)}
                    name="game"
                    onClick={handleChange}
                    className={
                      isFocused2 === 2
                        ? "cursor-pointer border rounded-lg sm:w-full p-2 border-cyan-400"
                        : "cursor-pointer border rounded-lg sm:w-full p-2 border-gray-400 focus:border-2"
                    }
                    value="No"
                    readOnly
                  />
                </div>
                {error4 && <p className="text-red-600">{error4}</p>}
              </div>
            </div>
            <div className="flex justify-evenly gap-5 flex-col sm:flex-row">
              <div className="sm:w-1/2 space-y-2">
                <label className="text-sm font-bold ">Getting Up</label>
                <div className="w-full flex flex-col gap-4 sm:flex-row">
                  <input
                    required
                    onChange={handleChange}
                    type="number"
                    min="0"
                    max="11"
                    step="1"
                    className="border w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                    placeholder="Hour"
                    name="hrUp"
                  />
                  <input
                    required
                    onChange={handleChange}
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    className="border w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                    placeholder="Minute"
                    name="minUp"
                  />
                  <select
                    required
                    name="typeUp"
                    onChange={handleChange}
                    className="border w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Choose</option>
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
                  </select>
                </div>
              </div>
              <div className="sm:w-1/2 space-y-2">
                <label className="text-sm font-bold ">Going to Bed</label>
                <div className="w-full flex flex-col gap-4 sm:flex-row">
                  <input
                    required
                    onChange={handleChange}
                    type="number"
                    min="0"
                    max="23"
                    step="1"
                    className="border w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                    placeholder="Hour"
                    name="hrbed"
                  />
                  <input
                    required
                    onChange={handleChange}
                    min="0"
                    max="59"
                    step="1"
                    type="number"
                    className="border w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                    placeholder="Minute"
                    name="minbed"
                  />
                  <select
                    required
                    name="typebed"
                    onChange={handleChange}
                    className="border w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Choose</option>
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <button className="bg-cyan-500 w-full p-2 text-white font-semibold text-lg rounded-lg transition ease-in-out delay-200 hover:bg-cyan-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserForm;
