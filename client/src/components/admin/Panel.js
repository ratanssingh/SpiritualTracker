import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Panel = () => {
  const nav = useNavigate();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    allUsers();
  }, []);

  const allUsers = async () => {
    try {
      const res = await axios.get("/getAllUsers", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setUserDetails(res.data.results);
    } catch (error) {
      nav("/ngo/admin/login");
    }
  };
  return (
    <>
      <Header name="admin" />
      <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-600 h-screen">
      <Link to={'/write-notes'}>
        <div className="w-fit m-auto flex items-center bg-gray-700 text-white p-3 gap-2 transition ease-in-out delay-100 hover:bg-gray-600 cursor-pointer">
          <PencilSquareIcon className="h-5 w-5" />
          <p>Note for User</p>{" "}
        </div>
      </Link>
        <div className="w-full lg:w-1/2 overflow-x-scroll  m-auto border-gray-200 border mt-10 shadow-2xl shadow-cyan-400 rounded-lg bg-white">
          <table className="w-full">
            <tbody>
              <tr className="border-b bg-cyan-50">
                <th className="p-2">Name</th>
                <th>Phone no.</th>
                <th>Details</th>
              </tr>
              {userDetails?.map((items) => (
                <tr className="border-b" key={items.sno}>
                  <td className="text-center p-4">{items.username}</td>
                  <td className="text-center">{items.phone}</td>
                  <td className="text-center">
                    <Link to={"/details/user/" + items.sno}>
                      <button className="bg-cyan-600 p-2 font-bold  text-white rounded-md transition delay-100 hover:bg-cyan-800">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Panel;
