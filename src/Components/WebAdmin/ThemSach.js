import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    var { match } = this.props;
    this.state = {
      danhmuc: match.params.danhmuc,
      tensp: "",
      tacgia: "",
      tenurl: "",
      urlloaisp: "",
      nxb: "",
      namxb: "",
      kichthuoc: "",
      nhacungcap: "",
      hinhanhsanpham: "",
      gia: 0,
      loaibia: "",
      sotrang: 0,
      mota: "",
    };
  }

  onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value,
    });
  };

  update = (event) => {
    event.preventDefault();
    const {
      tensp,
      tacgia,
      tenurl,
      urlloaisp,
      nxb,
      namxb,
      kichthuoc,
      nhacungcap,
      hinhanhsanpham,
      gia,
      loaibia,
      sotrang,
      mota,
    } = this.state;
    console.log(
      tensp,
      tacgia,
      tenurl,
      urlloaisp,
      nxb,
      namxb,
      kichthuoc,
      nhacungcap,
      hinhanhsanpham,
      gia,
      loaibia,
      sotrang,
      mota
    );
  };

  render() {
    return (
      <div id="wrapper">
        {/* Sidebar */}
        <Sidebar />
        {/* End of Sidebar */}

        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <Topbar />

            {/* Begin Page Content */}
            <div className="container-fluid">
              {/* DataTales Example */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-danger">
                    Thêm sách {this.state.danhmuc}
                  </h6>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label> Tên Sách </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tensp"
                        name="tensp"
                        value={this.state.tensp}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Tác Giả </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tacgia"
                        name="tacgia"
                        value={this.state.tacgia}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Slug </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tenurl"
                        name="tenurl"
                        value={this.state.tenurl}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> URL Loại Sách </label>
                      <input
                        type="text"
                        className="form-control"
                        id="urlloaisp"
                        name="urlloaisp"
                        value={this.state.urlloaisp}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Nhà Xuất Bản </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nxb"
                        name="nxb"
                        value={this.state.nxb}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Năm Xuất Bản </label>
                      <input
                        type="text"
                        className="form-control"
                        id="namxb"
                        name="namxb"
                        value={this.state.namxb}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Kích Thước </label>
                      <input
                        type="text"
                        className="form-control"
                        id="kichthuoc"
                        name="kichthuoc"
                        value={this.state.kichthuoc}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Nhà Cung Cấp </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nhacungcap"
                        name="nhacungcap"
                        value={this.state.nhacungcap}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Hình Ảnh </label>
                      <input
                        type="text"
                        className="form-control"
                        id="hinhanhsanpham"
                        name="hinhanhsanpham"
                        value={this.state.hinhanhsanpham}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Giá </label>
                      <input
                        type="number"
                        className="form-control"
                        id="gia"
                        name="gia"
                        value={this.state.gia}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Loại Bìa </label>
                      <input
                        type="text"
                        className="form-control"
                        id="loaibia"
                        name="loaibia"
                        value={this.state.loaibia}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Số Trang </label>
                      <input
                        type="number"
                        className="form-control"
                        id="sotrang"
                        name="sotrang"
                        value={this.state.sotrang}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Mô tả </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="mota"
                        name="mota"
                        value={this.state.mota}
                        onChange={this.onChange}
                      />
                    </div>

                    <NavLink
                      to={"/admin/category/" + this.state.danhmuc}
                      className="btn btn-danger"
                    >
                      CANCEL
                    </NavLink>
                    &nbsp;
                    <button
                      onClick={() => {
                        this.update();
                      }}
                      type="submit"
                      name="updatebtn"
                      className="btn btn-primary"
                    >
                      THÊM SÁCH
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
      </div>
    );
  }
}
