import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { userDetail } from "./Data";
import Dropdown from 'react-bootstrap/Dropdown';

const UserDropdown = () => {
  const userData = userDetail;
  const history = useHistory();

  const userEmail = localStorage.getItem("ADMINEMAIL");

  const handleClick = () => {
    localStorage.removeItem("ADMIN");
    localStorage.removeItem("ADMINEMAIL");
    history.push("/");
  };

  return (
    <>
      {/* <li className="dropdown">
        <a
          href="/"
          data-toggle="dropdown"
          className="nav-link dropdown-toggle nav-link-lg nav-link-user"
        >
          <img
            alt="image"
            src={userData.userImg}
            className="rounded-circle mr-1"
          />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <div style={{ color: "#6777ef", textAlign: "center" }}>
            {userEmail ? <div>{userEmail}</div> : <span>Login</span>}
          </div>
          {userData.datas.map((data, idata) => {
            return (
              <>
                <NavLink
                  key={idata}
                  to={data.link}
                  activeStyle={{
                    color: "#6777ef",
                  }}
                  exact
                  className="dropdown-item has-icon"
                >
                  <i className={data.icode} /> {data.title}
                </NavLink>
              </>
            );
          })}

          <div className="dropdown-divider" />
          <a
            // href="/"
            className="dropdown-item has-icon text-danger"
            onClick={handleClick}
          >
            <i className={userData.logoutIcon} /> {userData.logoutTitle}
          </a>
        </div>
      </li> */}
     <Dropdown>
      <Dropdown.Toggle variant="white" id="dropdown-basic" >
      <img
            style={{ height: '40px' , width:'40px'}}
            alt="image"
            src={userData.userImg}
            className="rounded-circle mr-1"
          />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => history.push("/change-password")}>Change Password</Dropdown.Item>
        <Dropdown.Item onClick={() => history.push("/reset-password")}>Reset Password</Dropdown.Item>
        <Dropdown.Item onClick={handleClick}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
};

export default UserDropdown;
