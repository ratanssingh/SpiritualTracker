import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { TimePicker } from "antd";

const EditUser = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({});
  const [isFocused, setIsFocused] = useState();
  const [isFocused2, setIsFocused2] = useState();
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [readingTime, setReadingTime] = useState(null);
  const [hearingTime, setHearingTime] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/ngo/admin/login");
    }
    handleUser();
  }, []);

  const handleUser = async () => {
    try {
      const res = await axios.get("/getUser/details/" + id);
      setUserDetails(res.data.results);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    initialValues.hear_time = hearingTime;
    initialValues.read_time = readingTime;
    setInitialValues({ ...initialValues, [name]: value });
    console.log(initialValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!readingTime) {
      setError1("Please select a time.");
    } else if (!hearingTime) {
      setError1(null);
      setError2("Please select a time.");
    } else {
      setError1(null);
      setError2(null);
      postData();
    }
  };

  const postData = async () => {
    try {
      await axios.put("/edit/user/" + id, initialValues);
      nav("/adminpanel");
    } catch (error) {
      alert(error);
    }
  };

  const handleTimeChange1 = (time, timeString) => {
    setReadingTime(timeString);
  };
  const handleTimeChange2 = (time, timeString) => {
    setHearingTime(timeString);
  };

  const handleInputBlur1 = (id) => {
    setIsFocused(id);
  };
  const handleInputBlur2 = (id) => {
    setIsFocused2(id);
  };

  useEffect(() => {
    if (userDetails.length > 0) {
      const initialVal = {
        chant_rounds: userDetails[0]?.chant_rounds || "",
        service: userDetails[0]?.service || "",
        speaker: userDetails[0]?.speaker || "",
        hear_time: userDetails[0]?.hear_time || "",
        author: userDetails[0]?.author || "",
        read_time: userDetails[0]?.read_time || "",
        attend_session: userDetails[0]?.attend_session || "",
        attend_game: userDetails[0]?.attend_game || "",
        hrUp: userDetails[0]?.up_time.split(/[ :]+/)[0] || "",
        minUp: userDetails[0]?.up_time.split(/[ :]+/)[1] || "",
        typeUp: userDetails[0]?.up_time.split(/[ :]+/)[2] || "",
        hrbed: userDetails[0]?.bet_time.split(/[ :]+/)[0] || "",
        minbed: userDetails[0]?.bet_time.split(/[ :]+/)[1] || "",
        typebed: userDetails[0]?.bet_time.split(/[ :]+/)[2] || "",
        sno: userDetails[0]?.sno || "",
        submit_date: userDetails[0]?.submit_date || "",
      };
      setInitialValues(initialVal);
      setIsFocused(userDetails[0]?.attend_session);
      setIsFocused2(userDetails[0]?.attend_game);
      setReadingTime(userDetails[0]?.read_time);
      setHearingTime(userDetails[0]?.hear_time);
    }
  }, [userDetails]);

  return (
    <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-600 h-full sm:h-screen">
      {isLoading ? (
        <p>loading...</p>
      ) : (
        userDetails &&
        userDetails?.map((item) => (
          <div
            key={item.id}
            className="w-fit xl:w-3/5 m-auto border-gray-200 border mt-14 shadow-2xl shadow-cyan-400 rounded-lg"
          >
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
                    defaultValue={item.chant_rounds}
                    onChange={handleChange}
                    required
                    className="border rounded-lg w-full p-2 border-gray-400 focus:outline-none focus:border-cyan-400"
                    type="number"
                    min={0}
                    max={100}
                    name="chant_rounds"
                  />
                </div>
                <div className="sm:w-1/2 space-y-2">
                  <label className="text-sm font-bold ">
                    Service Rendering
                  </label>
                  <input
                    defaultValue={item.service}
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
                        defaultValue={dayjs(item.hear_time, "HH:mm:ss")}
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
                        defaultValue={item.speaker}
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
                        defaultValue={dayjs(item.read_time, "HH:mm:ss")}
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
                        defaultValue={item.author}
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
                <div className="sm:w-1/2 space-y-2">
                  <label className="text-sm font-bold ">
                    Attending Chanting-Reading Sessions
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      name="attend_session"
                      onClick={handleChange}
                      value="Everyday"
                      onBlur={(e) => handleInputBlur1(e.target.value)}
                      className={
                        isFocused === "Everyday"
                          ? "cursor-pointer border rounded-lg sm:w-20 p-2 border-cyan-400"
                          : "cursor-pointer border rounded-lg sm:w-20 p-2 border-gray-400 focus:border-2"
                      }
                      readOnly
                    />
                    <input
                      name="attend_session"
                      onClick={handleChange}
                      value="More a day"
                      onBlur={(e) => handleInputBlur1(e.target.value)}
                      className={
                        isFocused === "More than a day"
                          ? "cursor-pointer border rounded-lg sm:w-full p-2 border-cyan-400"
                          : "cursor-pointer border rounded-lg sm:w-full p-2 border-gray-400 focus:border-2"
                      }
                      readOnly
                    />
                    <input
                      name="attend_session"
                      onClick={handleChange}
                      value="1 Day"
                      onBlur={(e) => handleInputBlur1(e.target.value)}
                      className={
                        isFocused === "1 Day"
                          ? "cursor-pointer border rounded-lg sm:w-20 p-2 border-cyan-400"
                          : "cursor-pointer border rounded-lg sm:w-20 p-2 border-gray-400 focus:border-2"
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="sm:w-1/2 space-y-2">
                  <label className="text-sm font-bold ">
                    Attending Weekend GAME Class
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      onBlur={(e) => handleInputBlur2(e.target.value)}
                      name="attend_game"
                      onClick={handleChange}
                      className={
                        isFocused2 === "Yes"
                          ? "cursor-pointer border rounded-lg sm:w-full p-2 border-cyan-400"
                          : "cursor-pointer border rounded-lg sm:w-full p-2 border-gray-400 focus:border-2"
                      }
                      value="Yes"
                      readOnly
                    />
                    <input
                      onBlur={(e) => handleInputBlur2(e.target.value)}
                      name="attend_game"
                      onClick={handleChange}
                      className={
                        isFocused2 === "No"
                          ? "cursor-pointer border rounded-lg sm:w-full p-2 border-cyan-400"
                          : "cursor-pointer border rounded-lg sm:w-full p-2 border-gray-400 focus:border-2"
                      }
                      value="No"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-evenly gap-5 flex-col sm:flex-row">
                <div className="sm:w-1/2 space-y-2">
                  <label className="text-sm font-bold ">Getting Up</label>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <input
                      defaultValue={item.up_time.split(/[ :]+/)[0]}
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
                      defaultValue={item.up_time.split(/[ :]+/)[1]}
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
                      defaultValue={item.up_time.split(/[ :]+/)[2]}
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
                  <div className=" flex flex-col gap-4 sm:flex-row">
                    <input
                      defaultValue={item.bet_time.split(/[ :]+/)[0]}
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
                      defaultValue={item.bet_time.split(/[ :]+/)[1]}
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
                      defaultValue={item.bet_time.split(/[ :]+/)[2]}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        ))
      )}
    </div>
  );
};

export default EditUser;
