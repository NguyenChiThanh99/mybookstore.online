import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Global from "../Global";
import axios from "axios";
import qs from "qs";

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
      tensp: location.state.data.tensp,
      gia: location.state.data.gia,
      soluongsanpham: location.state.data.soluongsanpham,
      iscomment: location.state.data.iscomment,
      allProduct: [],
    };
  }

  componentDidMount = () => {
    this.getProduct();
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

  getProduct = () => {
    const url = Global.link + "webadmin/dropdownproduct";
    const options = {
      method: "GET",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
    };
    axios(options).then((res) => {
      this.setState({ allProduct: res.data.data });
    });
  };

  showProduct = () => {
    var result = null;
    if (this.state.allProduct.length !== 0) {
      result = this.state.allProduct.map((item, index) => {
        return (
          <Dropdown.Item
            key={index}
            className="mydropdown-item account_active_dropdown"
            onSelect={() => {
              this.setState({
                tensp: item.tensp,
              });
            }}
          >
            {item.tensp}
          </Dropdown.Item>
        );
      });
    }
    return result;
  };

  render() {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        className="text-decoration-none"
        href="# "
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <div className="form-control">{children}</div>
      </a>
    ));

    const ProductDropdown = (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {this.state.tensp}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdowm-scroll-admin2">
          {this.showProduct()}
        </Dropdown.Menu>
      </Dropdown>
    );

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
                      {ProductDropdown}
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
                        readOnly
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
