import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";

export default class Menu extends Component {
  render() {
    return (
      <div>
        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            {/* Sidebar - Brand */}
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.php"
            >
              <div className="sidebar-brand-icon rotate-n-1">
                <img
                  src={require("../../images/logo.png")}
                  alt="mybookstore.online Logo"
                  height="50px"
                />
              </div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
              <a className="nav-link" href="index.php">
                <i className="fa fa-fw fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">THÔNG TIN QUẢN LÝ</div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="# "
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-fw fa-cog" />
                <span>Đầu sách</span>
              </a>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">DANH MỤC SÁCH:</h6>
                  <a className="collapse-item" href="hanoi.php">
                    Văn học
                  </a>
                  <a className="collapse-item" href="hochiminh.php">
                    Sách thiếu nhi
                  </a>
                  <a className="collapse-item" href="danang.php">
                    Kinh tế
                  </a>
                  <a className="collapse-item" href="hanoi.php">
                    Tiểu sử - hồi ký
                  </a>
                  <a className="collapse-item" href="hochiminh.php">
                    Tâm lý - kỹ năng sống
                  </a>
                  <a className="collapse-item" href="danang.php">
                    Sách giao khoa - tham khảo
                  </a>
                  <a className="collapse-item" href="hanoi.php">
                    Nuôi dạy con
                  </a>
                  <a className="collapse-item" href="hochiminh.php">
                    Sách ngoại ngữ
                  </a>
                </div>
              </div>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">QUẢN LÝ ĐƠN HÀNG</div>
            {/* Nav Item - Charts */}
            <li className="nav-item">
              <a className="nav-link" href="donhang.php">
                <i className="fas fa-fw fa-chart-area" />
                <span>Đơn Hàng</span>
              </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
              <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
          </ul>
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
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
                        className="dropdown-item"
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
                      <form>
                        <NavLink
                          to="/admin"
                          type="submit"
                          name="logout_btn"
                          className="btn btn-primary"
                        >
                          Logout
                        </NavLink>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Begin Page Content */}
              <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-3">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>
                {/* Content Row */}
                <div className="row">
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                              TỔNG SỐ ĐẦU SÁCH
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              180
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                              TỔNG SỐ ĐƠN HÀNG
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              120
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pending Requests Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                              TỔNG SỐ TÀI KHOẢN
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              25
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-comments fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                  <div className="copyright text-center my-auto"></div>
                </div>
              </footer>
              {/* End of Footer */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
    );
  }
}
