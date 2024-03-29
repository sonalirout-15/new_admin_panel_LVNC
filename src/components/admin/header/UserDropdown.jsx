import React from "react";
import { useHistory } from "react-router-dom";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";

const UserDropdown = () => {
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("ADMIN");
    history.push("/");
    window.location.reload()
  };

  return (
    <>
  <div className='userDropdown'>
      <MDBDropdown>
        <MDBDropdownToggle nav caret>
          <img
            style={{ height: '40px', width: '40px' }}
            alt="image"
            src='../../../assets/img/avatar/1.png'
            className="rounded-circle mr-1"
          />
        </MDBDropdownToggle>
        <MDBDropdownMenu >
          <MDBDropdownItem onClick={() => history.push("/change-password")}>Change Password</MDBDropdownItem>
          <MDBDropdownItem onClick={() => history.push("/reset-password")}>Reset Password</MDBDropdownItem>
          <MDBDropdownItem onClick={handleClick}>Logout</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
      </div>
    </>
  );
};

export default UserDropdown;
