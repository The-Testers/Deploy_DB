import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/login";

//===============================================================

const Navigation = () => {
  // ---------------------------------------------
  const state = useSelector((state) => {
    return { isLoggedIn: state.loginReducer.isLoggedIn };
  });

  const dispatch = useDispatch();

  const history = useNavigate();
  // ---------------------------------------------
  return (
    <>
      <div className="NavBar">
        {state.isLoggedIn ? (
          <>
            <Link className="Link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="Link" to="/newArticle">
              Add New Article
            </Link>
            <button
              className="logout"
              onClick={() => {
                dispatch(logout());
                localStorage.clear();
                history("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="Link" to="/register">
              Register
            </Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navigation;
