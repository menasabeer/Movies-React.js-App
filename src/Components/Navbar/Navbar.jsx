import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ userData, logOut }) {
  return (
    <>
      <div className="py-5">
        <nav className="navbar navbar-expand-lg bg-transparent text-center">
          <div className="container-fluid  text-center ">
            <h1 className="navbar-brand text-white fs-1 fw-bold ">Noxe</h1>
            <button
              className="navbar-toggler text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {userData ? (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white">
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'nav-link active ' : 'nav-link link-hover'
                      }
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link link-hover'
                      }
                      to="movies"
                    >
                      Movies
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link link-hover'
                      }
                      to="tv"
                    >
                      Tv
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link link-hover'
                      }
                      to="people"
                    >
                      People
                    </NavLink>
                  </li>
                </ul>
              ) : (
                ''
              )}
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center mx-5">
                <li className=" px-1 ">
                  <i className=" px-1 fab mx-1 fa-facebook cursor-pointer link-hover"></i>
                  <i className=" px-1 fab mx-1 fa-instagram cursor-pointer link-hover"></i>
                  <i className=" px-1 fab mx-1 fa-twitter cursor-pointer link-hover"></i>
                  <i className=" px-1 fab mx-1 fa-spotify cursor-pointer link-hover"></i>
                  <i className=" px-1 fab mx-1 fa-youtube cursor-pointer link-hover"></i>
                </li>
              </ul>
              {userData ? (
                <ul className="navbar-nav  mb-2 mb-lg-0 align-items-center">
                  <li className="nav-item">
                    <span
                      className="cursor-pointer link-hover"
                      onClick={logOut}
                    >
                      Logout
                    </span>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link link-hover'
                      }
                      to="profile"
                    >
                      <i className="fa-solid fa-user mx-2 fa-2x"></i>
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav  mb-2 mb-lg-0 align-items-center">
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link link-hover'
                      }
                      to="login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link link-hover'
                      }
                      to="register"
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
