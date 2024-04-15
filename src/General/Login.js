import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginUser } from "./Axios/Axios";
import { storeTokenData } from "./Axios/Axios";
import { CircularProgress } from "@material-ui/core";


import "./Login.css";
import LoginSessionCheck from "./LoginSessionCheck";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    setErrorMessages("")
    setLoading(true)

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    try {
      let tokenData = await LoginUser(data)
      storeTokenData(tokenData)
      navigate("/home")
    } catch (error) {
      const errorMessage = error.response.data.message
      setErrorMessages(errorMessage)
    } finally {
      setLoading(false);
    }

  };

  const renderErrorMessage = () => {
    return (
      <div className="error" style={{paddingBottom:"10px"}}>
        {errorMessages}
      </div>
    );
  };


  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {renderErrorMessage()}

        <div className="input-container">
          <label>Username </label>
          <input type="text" name="username" required />
        </div>

        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>

        <div className="button-container">

          {loading ? (
            <CircularProgress />
          ) : (
            <input type="submit" value="Login" />
          )}
        </div>


      </form>
    </div>
  );

  return (
    <div className="App">
      <LoginSessionCheck />
      <div class="container-fluid ps-md-0">
        <div class="row g-0">
          <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div class="col-md-8 col-lg-6">
            <div class="login d-flex align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-md-9 col-lg-8 mx-auto">
                    <h3 class="login-heading mb-4">Welcome back!</h3>



                    <form onSubmit={handleSubmit} >
                      <div class="form-floating mb-3">
                        <input type="username" className={"form-control"} id="floatingInput" name='username' placeholder="name@example.com" required />
                        <label for="floatingInput">Username</label>
                      </div>

                      <div class="form-floating mb-3">
                        <input type="password" className={"form-control"} id="floatingInput" name='password' placeholder="Password" required />
                        <label for="floatingInput">Username</label>
                      </div>

                      {renderErrorMessage()}


                      {loading ? (
                        <div className="loadingStyle">
                          <CircularProgress />
                        </div>
                      ) : (
                        <div class="d-grid">
                          <button class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit" value={"login"}>Sign in</button>
                        </div>
                      )}
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;