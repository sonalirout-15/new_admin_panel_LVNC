import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory } from "react-router-dom";
import { adminChangePasswordStart } from "../../../Redux/Actions/AdminActions";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const changePassData = useSelector((state) => state?.admin?.adminChangePassword);
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

    if(changePassData?.message === 'Password change succesfully'){
      history.push('/dashboard')
    }
    
    return(
      <div id="app">
      <section className="section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="login-brand">
                <img
                  src="../assets/img/stisla-fill.svg"
                  alt="logo"
                  width="100"
                  className="shadow-light rounded-circle"
                />
              </div>

              <div className="card card-primary">
                <div className="card-header">
                  <h4>Change Password</h4>
                </div>

                <div className="card-body">
                  <p className="text-muted">
                     Change your password
                  </p>
                  <form method="POST" onSubmit={handleSubmit}>

                    <div className="form-group">
                      <label for="password">Current Password</label>
                      <input
                        id="currentPassword"
                        type="password"
                        className="form-control pwstrength"
                        data-indicator="pwindicator"
                        name="currentPassword"
                        tabindex="2"
                        value={data.currentPassword}
                        onChange={handleChange}
                      />
                      <div id="pwindicator" className="pwindicator">
                        <div className="bar"></div>
                        <div className="label"></div>
                      </div>
                    </div>
                    <label style={{color: "red", marginLeft:'2%', display:'flex'}}>
                    {submit && !data.currentPassword && <small classNameName="p-invalid">Current password required.</small>}
                    </label>
                    <div className="form-group">
                      <label for="password-confirm">New Password</label>
                      <input
                        id="newPassword"
                        type="password"
                        className="form-control"
                        name="newPassword"
                        tabindex="2"
                        value={data.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <label style={{color: "red", marginLeft:'2%', display:'flex'}}>
                    {submit && !data.newPassword && <small classNameName="p-invalid">Confirm password required.</small>}
                    </label>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        tabindex="4"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="simple-footer">Copyright &copy; LVNC 2022</div>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
}

export default ChangePassword;