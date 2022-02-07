import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, userLogout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { data: logoutData, loading: logoutLoading } = useSelector(
    (state) => state.userLogout
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      icon: "error",
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userLogout());
      }
    });
  };

  useEffect(() => {
    if (userInfo) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userInfo, setLoggedIn]);

  useEffect(() => {
    if (logoutData) {
      Swal.fire("Sucessfuly Logged out!", "", "success");
      setLoggedIn(false);
      navigate("../", { replace: true });
    }
  }, [logoutData, navigate]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light rounded "
      aria-label="Eleventh navbar example"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample09">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/users">
                Users
              </a>
            </li>
          </ul>
          <form>
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </form>

          {loggedIn && userInfo ? (
            <div className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                id="dropdown09"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userInfo.name}
                Welcome {userInfo.name}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-lg-end"
                aria-labelledby="dropdown09"
              >
                <li>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <a href="/login">
              <button
                type="button"
                className="btn btn-primary my-3 ms-none ms-lg-3"
              >
                Sign in
              </button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
