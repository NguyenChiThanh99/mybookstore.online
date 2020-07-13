import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Global from "../Global";
import axios from "axios";
import qs from "qs";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";
import "../../CSS/webadmin.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

var timer10 = null;

export class EditChiTietDonHang extends Component {
  constructor(props) {
    super(props);
    var { location } = this.props;
    this.state = {
      order: location.state.order,
      _id: location.state.data._id,
      tensp: location.state.data.tensp,
      soluongsanpham: location.state.data.soluongsanpham,
      iscomment: location.state.data.iscomment,
      allProduct: [],
      err: '',
    };
  }

  componentDidMount = () => {
    this.getProduct();
  }

  componentWillUnmount() {
    clearTimeout(timer10);
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
    const { order, _id, soluongsanpham, iscomment } = this.state;
    if (
      soluongsanpham <= 0
    ) {
      this.setState({
        err: "Vui lòng nhập số lượng sản phẩm.",
      });
      timer10 = setTimeout(() => this.setState({ err: "" }), 4000);
    } else {
      var data = null;
      if (_id !== this.props.location.state.data._id) {
        data = {
          id: order,
          idsanpham: this.props.location.state.data._id,
          idsanphamnew: _id,
          soluongsanpham: soluongsanpham,
          iscomment: false,
        };
      } else {
        data = {
          id: order,
          idsanpham: this.props.location.state.data._id,
          soluongsanpham: soluongsanpham,
          iscomment: iscomment,
        };
      }
      const url = Global.link + "webadmin/editchitietdonhang";
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.data === "success") {
          this.props.history.push("/admin/orderdetail/" + this.state.order);
        }
      });
    }
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
                _id: item._id,
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

    const errJSX = (
      <div className="alert alert-danger alert-dismissible fade show mb-4">
        {this.state.err}
      </div>
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

                    {this.state.err === "" ? null : errJSX}
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

export default withRouter(EditChiTietDonHang);