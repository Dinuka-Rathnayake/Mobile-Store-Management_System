import React, { useState } from "react";
import { getApi } from "../utils/axios"
import { popAlert } from "../utils/alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../reducers/auth";
import jwt from "jwt-decode";
import Header from "../common/Header"
import Footer from "../common/Footer"

function Login (props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Lemail, LsetEmail] = useState("");
    const [Lpassword, LsetPassword] = useState("");

    const [Rname, RsetName] = useState("");
    const [Remail, RsetEmail] = useState("");
    const [Rpassword, RsetPassword] = useState("");
    const [RpasswordSec, RsetPasswordSec] = useState("");
  
    const loginSubmitHandler = (e) => {
      e.preventDefault();
  
      getApi()
        .post("/api/user/login", { email:Lemail, password:Lpassword })
        .then((res) => {
          
          const token = res.data.token;
          const tokenPayload = jwt(token);
          dispatch(authActions.login(token));

          console.log(tokenPayload.userId)


          popAlert(
            "Success!",
            "You have successfully logged in to the system!",
            "success",
            "Ok"
          ).then((res) => {
            
            navigate("/");
          });
        })
        .catch((err) => {
          popAlert("Error!", err.response.data.message, "error", "Ok");
        });
    };

    
const registerSubmitHandler = (e) => {
  e.preventDefault();
  

  getApi()
    .post("api/user/register", {
      email: Remail,
      password: Rpassword,
      passwordSec: RpasswordSec,
      name: Rname
    })
    .then((res) => {
      popAlert(
        "Success!",
        "You have successfully logged in to the system!",
        "success",
        "Ok")
      //console.log(res.data);
    })
    .catch((err) => {
      popAlert("Error!", err.response.data.message, "error", "Ok");
      console.error(err);
    });

};
    


    return(

        <>
         <Header />
  <main className="main">
    {/* End .breadcrumb-nav */}
    <div
      className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
      style={{
        backgroundImage: 'url("assets/images/backgrounds/login-bg.jpeg")'
      }}
    >
      <div className="container">
        <div className="form-box">
          <div className="form-tab">
            <ul className="nav nav-pills nav-fill" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="signin-tab-2"
                  data-toggle="tab"
                  href="#signin-2"
                  role="tab"
                  aria-controls="signin-2"
                  aria-selected="false"
                >
                  Sign In
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="register-tab-2"
                  data-toggle="tab"
                  href="#register-2"
                  role="tab"
                  aria-controls="register-2"
                  aria-selected="true"
                >
                  Register
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade"
                id="signin-2"
                role="tabpanel"
                aria-labelledby="signin-tab-2"
              >
                <form onSubmit={loginSubmitHandler}>
                  <div className="form-group">
                    <label htmlFor="singin-email-2">
                      Username or email address *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="singin-email-2"
                      name="singin-email"
                      required=""
                      onChange={(e) => LsetEmail(e.target.value)}
                    />
                  </div>
                  {/* End .form-group */}
                  <div className="form-group">
                    <label htmlFor="singin-password-2">Password *</label>
                    <input
                      type="password"
                      className="form-control"
                      id="singin-password-2"
                      name="singin-password"
                      required=""
                      onChange={(e) => LsetPassword(e.target.value)}
                    />
                  </div>
                  {/* End .form-group */}
                  <div className="form-footer">
                    <button type="submit" className="btn btn-outline-primary-2">
                      <span>LOG IN</span>
                      <i className="icon-long-arrow-right" />
                    </button>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="signin-remember-2"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="signin-remember-2"
                      >
                        Remember Me
                      </label>
                    </div>
                    {/* End .custom-checkbox */}
                    <a href="#" className="forgot-link">
                      Forgot Your Password?
                    </a>
                  </div>
                  {/* End .form-footer */}
                </form>
                {/* End .form-choice */}
              </div>
              {/* .End .tab-pane */}
              <div
                className="tab-pane fade show active"
                id="register-2"
                role="tabpanel"
                aria-labelledby="register-tab-2"
              >
                <form onSubmit={registerSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="register-email-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id=""
                      name="name"
                      required=""
                      onChange={(e) => RsetName(e.target.value)}
                      
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-email-2">
                      Your email address *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="register-email-2"
                      name="register-email"
                      required=""
                      onChange={(e) => RsetEmail(e.target.value)}
                      
                    />
                  </div>
                  {/* End .form-group */}
                  <div className="form-group">
                    <label htmlFor="register-password-2">Password *</label>
                    <input
                      type="password"
                      className="form-control"
                      id="register-password-2"
                      name="register-password"
                      required=""
                      onChange= {(e) => RsetPassword(e.target.value)}
                      
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-password-2">Re-Enter Password *</label>
                    <input
                      type="password"
                      className="form-control"
                      id="register-password-2"
                      name="register-password"
                      required=""
                      onChange= {(e) => RsetPasswordSec(e.target.value)}
                    />
                  </div>
                  {/* End .form-group */}
                  <div className="form-footer">
                    <button type="submit" className="btn btn-outline-primary-2">
                      <span>SIGN UP</span>
                      <i className="icon-long-arrow-right" />
                    </button>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="register-policy-2"
                        required=""
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="register-policy-2"
                      >
                        I agree to the <a href="#">privacy policy</a> *
                      </label>
                    </div>
                    {/* End .custom-checkbox */}
                  </div>
                  {/* End .form-footer */}
                </form>
                {/* End .form-choice */}
              </div>
              {/* .End .tab-pane */}
            </div>
            {/* End .tab-content */}
          </div>
          {/* End .form-tab */}
        </div>
        {/* End .form-box */}
      </div>
      {/* End .container */}
    </div>
    {/* End .login-page section-bg */}
  </main>
  {/* End .main */}
  <Footer />
</>

    );
}

export default Login;