import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";

export class Sidebar extends Component {
  goToDanhSachSanPham = (danhmuc) => {
    this.props.history.push("/admin/category/" + danhmuc);
    window.location.reload();
  }

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
          <div className="sidebar-brand-icon rotate-n-1 ml-3 mr-1">
            <img
              src={require("../../images/giaodien-05.png")}
              alt="mybookstore.online Logo"
              height="50px"
            />
          </div>
          <div className="sidebar-brand-text mr-3 ml-1" img="img/icon_app.png">
            mybookstore online
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
            <i className="fal fa-books" />
            &nbsp;&nbsp;
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
              <a
                href="# "
                className="collapse-item"
                onClick={() => {
                  this.goToDanhSachSanPham("Văn học");
                }}
              >
                Văn học
              </a>
              <a
                href="# "
                className="collapse-item"
                onClick={() => {
                  this.goToDanhSachSanPham("Sách thiếu nhi");
                }}
              >
                Sách thiếu nhi
              </a>
              <a
                href="# "
                className="collapse-item"
                onClick={() => {
                  this.goToDanhSachSanPham("Kinh tế");
                }}
              >
                Kinh tế
              </a>
              <a
                href="# "
                className="collapse-item"
                onClick={() => {
                  this.goToDanhSachSanPham("Tiểu sử - hồi ký");
                }}
              >
                Tiểu sử-hồi ký
              </a>
              <a
                href="# "
                className="collapse-item"
                onClick={() => {
                  this.goToDanhSachSanPham("Tâm lý - Kỹ năng sống");
                }}
              >
                Tâm lý-kỹ năng sống
              </a>
              <a
                href="# "
                className="collapse-item"
                onClick={() => {
                  this.goToDanhSachSanPham("Sách giáo khoa - tham khảo");
                }}
              >
                Sách giáo khoa-tham khảo
              </a>
              <a
                href="# "
                className="collapse-item"
                onClick={() => {
                  this.goToDanhSachSanPham("Nuôi dạy con");
                }}
              >
                Nuôi dạy con
              </a>
              <a
                href="# "
                className="collapse-item"
                onClick={() => {
                  this.goToDanhSachSanPham("Sách ngoại ngữ");
                }}
              >
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
          <NavLink className="nav-link" to="/admin/order">
            <i className="fas fa-file-invoice" />
            &nbsp;&nbsp;
            <span>Đơn Hàng</span>
          </NavLink>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    );
  }
}

export default withRouter(Sidebar);