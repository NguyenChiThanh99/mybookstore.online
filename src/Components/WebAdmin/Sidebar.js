import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";

export default class Sidebar extends Component {
  render() {
    return (
      <ul
        className="navbar-nav sidebar sidebar-dark accordion"
        id="accordionSidebar"
        style={{ backgroundColor: "#eb2b3f" }}
      >
        {/* Sidebar - Brand */}
        <NavLink
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/admin/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-1">
            <img
              src={require("../../images/giaodien-04.jpg")}
              alt="mybookstore.online Logo"
              height="32px"
            />
          </div>
        </NavLink>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <NavLink className="nav-link" to="/admin/dashboard">
            <i className="fa fa-fw fa-tachometer-alt" />
            &nbsp;
            <span>Dashboard</span>
          </NavLink>
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
            <i className="fas fa-book" />
            &nbsp;
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
                Tiểu sử-hồi ký
              </a>
              <a className="collapse-item" href="hochiminh.php">
                Tâm lý-kỹ năng sống
              </a>
              <a className="collapse-item" href="danang.php">
                Sách giáo khoa-tham khảo
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
            <i className="fas fa-file-invoice" />
            &nbsp;
            <span>Đơn Hàng</span>
          </a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    );
  }
}
