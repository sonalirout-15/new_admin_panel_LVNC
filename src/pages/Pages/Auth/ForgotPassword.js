import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { adminForgotPasswordStart } from "../../../Redux/Actions/AdminActions";

const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const data = useSelector((state) => state?.admin?.adminForgotPassword);
    console.log('FORGOTPASS-DATA~~~~~~~~~~~~~>>>', data)
    const [submit, setsubmit] = useState(false)
    const [formInputes, setformInputes] = useState({
      email: "",
  })

  const [ErrorInputes, setErrorInputes] = useState({ ...formInputes })
  const handleChange = (e) => {
      const { name, value } = e.target
      setformInputes({ ...formInputes, [name]: value })
      switch (name) {
          case "email":
              if (!value) {
                  ErrorInputes.email = value.length > 0 ? "" : "Enter your email"
              }
              else {
                  ErrorInputes.email = emailRegx.test(value) === false && "Enter your valid email"
              }
              break;
          default:
              break;
      }
      setErrorInputes(ErrorInputes)
  }

  function validate(value) {
    if (!formInputes.email) {
        ErrorInputes.email = "Enter email"
    }
    return ErrorInputes
}
useEffect(() => {
  if (data.status === 200) {
      setformInputes({
      email: "",
    })
  }
}, [data])

useEffect(() => {
  if (Object.keys(ErrorInputes).length === 0 && Object.keys(formInputes).length !== 0) {
      console.log(ErrorInputes, "ErrorInputes")
  }
}, [])

const handleSubmit = (e) => {
  e.preventDefault()
  setsubmit(true)
  setErrorInputes(validate(formInputes));
  if (formInputes.email !== "") {
     if ( ErrorInputes.email.length == undefined) {
      var ForgotPasswordPayload={
          email:formInputes.email,
      }
      setTimeout(() => {
          dispatch(adminForgotPasswordStart(ForgotPasswordPayload));
        }, 2000); 
     }
   }
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
                    <h4>Forgot Password</h4>
                  </div>
                  <div class="card-body">
                    <form method="POST" onSubmit={handleSubmit}>
                      <div class="form-group">
                        <label for="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          class="form-control"
                          name="email"
                          tabindex="1"
                          value={data.email}
                          onChange={handleChange}
                          autofocus
                        />
                      </div>
                      <label style={{color: "red", marginLeft:'2%', display:'flex'}}>
                      <span className='cstm_error'>{ErrorInputes.email}</span>
                      </label>
                      <div class="form-group">
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg btn-block"
                          tabindex="4"
                        >
                          Forgot Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="simple-footer">Copyright &copy; Stisla 2018</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}

export default ForgotPassword;