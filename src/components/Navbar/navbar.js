import React, { useState } from "react";
import { links } from "../../utils/data";
import UserLogo from "../../images/user.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <b>COURSEVITA</b>
        </div>
        <div className="links-container">
          <ul className="links">
            {!userData &&
              links.map((link) => {
                const { id, url, text } = link;
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                );
              })}
          </ul>

          {userData && (
            <>
              <div
                className="profile-image-container"
                onMouseEnter={() => setShowProfileInfo(true)}
                onMouseLeave={() => setShowProfileInfo(false)}
              >
                <img
                  src={userData?.profilePicUrl || UserLogo}
                  alt={userData?.displayName || "User Name"}
                  className="profile-image"
                />

                {showProfileInfo && (
                  <div className="profile-info">
                    <p>{userData?.userCreationSource}</p>
                    <p>
                      {userData?.firstName} {userData?.lastName}
                    </p>
                    <p>{userData?.email}</p>
                  </div>
                )}
              </div>
              <div style={{ marginLeft: "1rem" }}>
                <Link to="/sign-in" onClick={handleLogout}>
                  Log Out
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
