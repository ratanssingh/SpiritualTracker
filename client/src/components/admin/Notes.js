import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const nav = useNavigate();
  const [note, setNote] = useState("");
  const [getNotes, setGetNotes] = useState([]);
  console.log(note);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/ngo/admin/login");
    }
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  const postData = async () => {
    try {
      await axios.post("/postnotes", { note });
      nav("/adminpanel");
      alert("Added Successfully");
    } catch (error) {
      alert(error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("/getnotes");
      setGetNotes(res.data.result);
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete("/deletenote/" + id);
      setGetNotes((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-600 min-h-screen">
      <div className="w-fit m-auto bg-white rounded-lg p-5 ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="font-bold">Write Note</label>
          <textarea
            required
            className="w-full border p-2 border-gray-400 focus:outline-none focus:border-cyan-500 focus:border-2"
            placeholder="Write something..."
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <button className="bg-cyan-500 w-full p-2 text-white font-bold rounded-md transition ease-in-out delay-100 hover:bg-cyan-700">
            Submit
          </button>
        </form>
      </div>
      {getNotes
        ? getNotes?.map((item) => (
            <div key={item.id} className="bg-white mt-10 p-5 flex gap-10 w-fit">
              <div className=" h-14 overflow-y-scroll">
                <p className="text-lg">{item.note}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-700 p-2 text-white font-bold rounded-md"
              >
                Delete
              </button>
            </div>
          ))
        : null}
    </div>
  );
};

export default Notes;
