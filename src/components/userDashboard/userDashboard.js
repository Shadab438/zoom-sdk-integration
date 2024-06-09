import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/constants";

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const paramValue = queryParams.get("_to-k_e--n");
  //   console.log(paramValue);
  localStorage.setItem("_to-k_e--n", paramValue);

  const fetchData = async () => {
    const response = await fetch(`${baseURL}/user/loggedInUser`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_to-k_e--n")} `,
      },
    });
    const data = await response.json();

    localStorage.setItem("userInfo", JSON.stringify(data));

    setUserData(data);

    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>Welcome {userData.firstName}</div>;
};

export default UserDashboard;
