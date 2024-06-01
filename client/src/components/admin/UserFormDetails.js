import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserFormDetails = () => {
  const { id } = useParams();
  const nav = useNavigate()
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/ngo/admin/login");
    }
    handleUser();
  }, []);

  const handleUser = async () => {
    try {
      const res = await axios.get("/getUser/" + id);
      setDetails(res.data.results);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-600 h-screen">
      {details ? (
        <div className="w-full m-auto overflow-x-scroll border-gray-200 border mt-14 shadow-2xl shadow-cyan-400 rounded-lg bg-white">
          <table className="w-full ">
            <tbody>
              <tr className="border-b bg-cyan-50">
                <th className="w-20 p-3">Chant Rounds</th>
                <th className="w-20 p-3">Service</th>
                <th className="w-20 p-3">Lecture Speaker</th>
                <th className="w-20 p-3">Listened for</th>
                <th className="w-20 p-3">Book Author</th>
                <th className="w-20 p-3">Read for</th>
                <th className="w-20 p-3">Attending Sessions</th>
                <th className="w-20 p-3">Attending Games class</th>
                <th className="w-20 p-3">Up time</th>
                <th className="w-20 p-3">Bed time</th>
                <th className="w-20 p-3">Date</th>
                <th className="w-20 p-3">Edit</th>
              </tr>
              {details?.map((items) => {
                return (
                  <tr className="border-b" key={items.id}>
                    <td className="text-center p-4">{items.chant_rounds}</td>
                    <td className="text-center">{items.service}</td>
                    <td className="text-center">{items.speaker}</td>
                    <td className="text-center">{items.hear_time}</td>
                    <td className="text-center">{items.author}</td>
                    <td className="text-center">{items.read_time}</td>
                    <td className="text-center">{items.attend_session}</td>
                    <td className="text-center">{items.attend_game}</td>
                    <td className="text-center">{items.up_time}</td>
                    <td className="text-center">{items.bet_time}</td>
                    <td className="text-center">{items.submit_date}</td>
                    
                  <td className="text-center">
                    <Link to={"/edit/user/detail/" + items.id}>
                      <button className="bg-gray-600 p-2 font-bold  text-white rounded-md transition delay-100 hover:bg-gray-800">
                        Edit
                      </button>
                    </Link>
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-fit m-auto p-5 bg-white rounded-md">
          No Data Available
        </div>
      )}
    </div>
  );
};

export default UserFormDetails;
