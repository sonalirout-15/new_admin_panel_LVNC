import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminResetPasswordStart } from "../../../Redux/Actions/AdminActions";

var passwordregx = /^(?=.*[a-z])(?!.* )(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

const ResetPassword = () => {
    const dispatch = useDispatch();
    const history = useState();
    const data = useSelector((state) => state?.admin?.adminResetPassword);
    console.log('DATA!!!~~~~~>>>>', data)
    const [submit, setsubmit] = useState(false);
    const [ResetPasswordInputes, setResetPasswordInputes] = useState({
      newPassword: "",
      confirmPassword: "",
    });
    const [ErrorResetPasswordInputes, setErrorResetPasswordInputes] = useState({
      ...ResetPasswordInputes,
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setResetPasswordInputes({ ...ResetPasswordInputes, [name]: value });
  
      switch (name) {
        case "newPassword":
          if (!value) {
            ErrorResetPasswordInputes.newPassword = "Please enter your Password";
          }
          else if (value.length < 4) {
            ErrorResetPasswordInputes.newPassword = "Password length must more than 4 character";
          }
          else if (value.length > 16) {
            ErrorResetPasswordInputes.newPassword = "Password length must be less than 16 characters";
          }
          else {
            ErrorResetPasswordInputes.newPassword = passwordregx.test(value) === false && "Enter valid current Password"
          }
          break;
          case "confirmPassword":
            if (!value) {
              ErrorResetPasswordInputes.confirmPassword = "Please enter your Password";
            }
            else if (value.length < 4) {
              ErrorResetPasswordInputes.confirmPassword = "Password length must more than 4 character";
            }
            else if (value.length > 16) {
              ErrorResetPasswordInputes.confirmPassword = "Password length must be less than 16 characters";
            }
            else {
              ErrorResetPasswordInputes.confirmPassword = passwordregx.test(value) === false && "Enter valid confirm Password"
            }
            break;
        default:
          break;
      }
      setErrorResetPasswordInputes(ErrorResetPasswordInputes);
    };

    function validate(value) {
      if (!ResetPasswordInputes.newPassword) {
        ErrorResetPasswordInputes.newPassword = "Enter new Password";
      }
      if (!ResetPasswordInputes.confirmPassword) {
        ErrorResetPasswordInputes.confirmPassword = "Enter confirm Password";
      }
      return ErrorResetPasswordInputes;
    }
    useEffect(() => {
      if (
        Object.keys(ErrorResetPasswordInputes).length === 0 &&
        Object.keys(ResetPasswordInputes).length !== 0
      ) {
      }
    }, []);
    const handleSubmit = (e) => {
      e.preventDefault();
      setsubmit(true);
      setErrorResetPasswordInputes(validate(ResetPasswordInputes));
  
      if (
        ResetPasswordInputes.newPassword !== "" &&
        ResetPasswordInputes.confirmPassword !== ""
      ) {
        //  if ( ErrorResetPasswordInputes.newPassword.length == undefined) {
        var resetPasswordPayload = {
          newPassword: ResetPasswordInputes.newPassword,
          confirmPassword: ResetPasswordInputes.confirmPassword,
        };
        setTimeout(() => {
          dispatch(adminResetPasswordStart(resetPasswordPayload));
        }, 1000);
      }
      //  }
    };

    if (data.status === 200) {
      history.push("/");
    }

    return(
        <div id="app">
        <section class="section">
          <div class="container mt-5">
            <div class="row">
              <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div class="login-brand">
                  <img
                    src="../assets/img/stisla-fill.svg"
                    alt="logo"
                    width="100"
                    class="shadow-light rounded-circle"
                  />
                </div>

                <div class="card card-primary">
                  <div class="card-header">
                    <h4>Reset Password</h4>
                  </div>

                  <div class="card-body">
                    <p class="text-muted">
                       Reset your password
                    </p>
                    <form method="POST" onSubmit={handleSubmit}>

                      <div class="form-group">
                        <label for="password">New Password</label>
                        <input
                          id="newPassword"
                          type="password"
                          class="form-control pwstrength"
                          data-indicator="pwindicator"
                          name="newPassword"
                          tabindex="2"
                          value={data.newPassword}
                          onChange={handleChange}
                        />
                        <div id="pwindicator" class="pwindicator">
                          <div class="bar"></div>
                          <div class="label"></div>
                        </div>
                      </div>
                      <label style={{color: "red", marginLeft:'2%', display:'flex'}}>
                      <span className="cstm_error">
                      {ErrorResetPasswordInputes.newPassword}
                    </span>
                      </label>
                      <div class="form-group">
                        <label for="password-confirm">Confirm Password</label>
                        <input
                          id="confirmPassword"
                          type="password"
                          class="form-control"
                          name="confirmPassword"
                          tabindex="2"
                          value={data.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                      <label style={{color: "red", marginLeft:'2%', display:'flex'}}>
                      <span className="cstm_error">
                      {ErrorResetPasswordInputes.confirmPassword}
                    </span>
                      </label>

                      <div class="form-group">
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg btn-block"
                          tabindex="4"
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="simple-footer">Copyright &copy; LVNC 2022</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}

export default ResetPassword;