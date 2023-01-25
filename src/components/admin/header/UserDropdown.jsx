import React from "react";
import { useHistory } from "react-router-dom";
import { userDetail } from "./Data";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";

const UserDropdown = () => {
  const userData = userDetail;
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("ADMIN");
    history.push("/");
  };

  return (
    <>

      <MDBDropdown>
        <MDBDropdownToggle nav caret>
          <img
            style={{ height: '40px', width: '40px' }}
            alt="image"
            src={userData.userImg}
            className="rounded-circle mr-1"
          />
        </MDBDropdownToggle>
        <MDBDropdownMenu >
          <MDBDropdownItem onClick={() => history.push("/change-password")}>Change Password</MDBDropdownItem>
          <MDBDropdownItem onClick={() => history.push("/reset-password")}>Reset Password</MDBDropdownItem>
          <MDBDropdownItem onClick={handleClick}>Logout</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </>
  );
};

export default UserDropdown;
