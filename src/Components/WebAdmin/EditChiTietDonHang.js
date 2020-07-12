import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";
import "../../CSS/webadmin.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default class EditChiTietDonHang extends Component {
  constructor(props) {
    super(props);
    var { location } = this.props;
    this.state = {
      order: location.state.order,
      _id: location.state.data._id,
      ten: location.state.data.ten,
      hinhanhsanpham: location.state.data.hinhanhsanpham,
      gia: location.state.data.gia,
      soluongsanpham: location.state.data.soluongsanpham,
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
    const { order, _id, ten, hinhanhsanpham, gia, soluongsanpham } = this.state;
    console.log(order, _id, ten, hinhanhsanpham, gia, soluongsanpham);
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
                    Chỉnh Sửa Thông Tin Chi Tiết Đơn Hàng
                  </h6>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label> Tên Sách </label>
                      <input
                        placeholder="VD: Đừng Chết Ở Ả Rập Xê Út"
                        type="text"
                        className="form-control"
                        id="ten"
                        name="ten"
                        value={this.state.ten}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Hình Ảnh </label>
                      <input
                        placeholder="VD: https://salt.tikicdn.com/cache/280x280/ts/product/49/3b/7b/53b204d12d9579fa628aed08d10033de.jpg"
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
                        placeholder="VD: 99000"
                        type="number"
                        className="form-control"
                        id="gia"
                        name="gia"
                        value={this.state.gia}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Số Lượng </label>
                      <input
                        placeholder="VD: 1"
                        type="number"
                        className="form-control"
                        id="soluongsanpham"
                        name="soluongsanpham"
                        value={this.state.soluongsanpham}
                        onChange={this.onChange}
                      />
                    </div>
                    <NavLink
                      to={"/admin/orderdetail/" + this.state.order}
                      className="btn btn-danger mb-2"
                    >
                      Cancel
                    </NavLink>
                    &nbsp;
                    <button
                      onClick={this.update}
                      type="submit"
                      name="updatebtn"
                      className="btn btn-primary mb-2"
                    >
                      Cập Nhật
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
