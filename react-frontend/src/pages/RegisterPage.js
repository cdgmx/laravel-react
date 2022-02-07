import React, { useEffect } from "react";
import { userRegister } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useSelector((state) => state.userRegister);
  const {userInfo } = useSelector((state) => state.userLogin);
 
  useEffect(() => {
    if (userInfo) {
      navigate("../", { replace: true });
    }
  }, [userInfo]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.password || error.email
      });
    } 
  }, [error]);

  useEffect(() => {
    if (data) {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "User registered successfully"
        });
        navigate("../login");
    }
    }, [data, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(userRegister(name, email, password));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mb-5"></div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-10">
          <div className="wrap d-md-flex">
            <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
              <div className="text w-100">
                <h2>Welcome to Register</h2>
                <p>Have an account?</p>
                <a href="/login" className="btn btn-white btn-outline-white">
                  Sign in
                </a>
              </div>
            </div>
            <div className="login-wrap p-4 p-lg-5">
              <div className="d-flex">
                <div className="w-100">
                  <h3 className="mb-4">Register</h3>
                </div>
                <div className="w-100">
                  <p className="social-media d-flex justify-content-end">
                    <a
                      href="#"
                      className="social-icon d-flex align-items-center justify-content-center"
                    >
                      <span className="fa fa-facebook"></span>
                    </a>
                    <a
                      href="#"
                      className="social-icon d-flex align-items-center justify-content-center"
                    >
                      <span className="fa fa-twitter"></span>
                    </a>
                  </p>
                </div>
              </div>

              <form action="#" className="signin-form" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label className="label" for="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="label" for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                  <div class="invalid-feedback">
      Please select a valid state.
    </div>
                </div>
                <div className="form-group mb-3">
                  <label className="label" for="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control btn btn-primary submit px-3"
                  >
                    Register
                  </button>
                </div>
                <div className="form-group d-md-flex">
                  <div className="w-50 text-left">
                    <label className="checkbox-wrap checkbox-primary mb-0">
                      Accept Terms and Conditions
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
