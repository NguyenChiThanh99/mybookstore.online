import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";

export default class Topbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* Sidebar Toggle (Topbar) */}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars" />
          </button>
          {/* Topbar Navbar */}
          <ul className="navbar-nav ml-auto">
            <div className="topbar-divider d-none d-sm-block" />
            {/* Nav Item - User Information */}
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="# "
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  Admin
                </span>
                <img
                  alt="avatar"
                  className="img-profile rounded-circle"
                  src="https://anhnendep.net/wp-content/uploads/2018/10/hinh-anh-chibi-nam-cute-lanh-lung-de-thuong-02.jpg"
                />
              </a>
              {/* Dropdown - User Information */}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <div className="dropdown-divider" />
                <a
                  className="dropdown-item nav-link text-dark text-nowrap mya-dropright"
                  href="# "
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
        {/* End of Topbar */}
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
        {/* Logout Modal*/}
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <form method="POST">
                  <NavLink
                    to="/admin"
                    type="submit"
                    name="logout_btn"
                    className="btn btn-danger"
                  >
                    Logout
                  </NavLink>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
