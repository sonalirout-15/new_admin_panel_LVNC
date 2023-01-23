import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { adminChangePasswordStart } from "../../../Redux/Actions/AdminActions";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [submit , setSubmit] = useState();
    const [data, setData] = useState({
      currentPassword:'',
      newPassword:''
    })

    const handleChange = (e) => {
      const value = e.target.value;
      setData({
        ...data,
        [e.target.name] : value,
      })
    }

      const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
        setData(data)
        if(data.currentPassword !== '' && data.newPassword !== '') {
          var changePassData = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
          }
          dispatch(adminChangePasswordStart(changePassData))
        }  
    };
    
    return(
        <div className="main-content">
        <section className="section" onSubmit={handleSubmit}>
          <div className="section-header">
            <h4>Admin Change Password</h4>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="section-body">
            <div className="row">
              <div className="col-18 col-md-6 col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Change Password</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Current Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="currentPassword"
                        value={data.currentPassword}
                        name="currentPassword"
                        onChange={handleChange} 
                        />
                    </div>
                    <label style={{
                    color: "red",
                    marginLeft: "2%",
                    display: "flex"
                }}>
                  {submit && !data.currentPassword && <small className="p-invalid">Current password required.</small>}
                </label>
                    <div className="form-group">
                      <label>New Password</label>
                      <input 
                        type="password" 
                        className="form-control"
                        id="newPassword"
                        value={data.newPassword}
                        name="newPassword"
                        onChange={handleChange} />
                    </div>
                    <label style={{
                    color: "red",
                    marginLeft: "2%",
                    display: "flex"
                }}>
                  {submit && !data.newPassword && <small className="p-invalid">New password required.</small>}
                </label>
                    <button type="submit" className="btn btn-primary">Submit</button>{" "}
                    <Link to={'/dashboard'} className="btn btn-info">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </form>
        </section>
      </div>
    )
}

export default ChangePassword;