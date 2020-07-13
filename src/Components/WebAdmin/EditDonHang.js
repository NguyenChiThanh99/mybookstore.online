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

var timer8 = null;

export class EditDonHang extends Component {
  constructor(props) {
    super(props);
    var { location } = this.props;
    this.state = {
      _id: location.state.data._id,
      email: location.state.data.email,
      ten: location.state.data.ten,
      diachi: location.state.data.diachi,
      dienthoai: location.state.data.dienthoai,
      ghichu: location.state.data.ghichu,
      thanhtoan: location.state.data.thanhtoan,
      tongtien: location.state.data.tongtien,
      trangthai: location.state.data.trangthai,
      err: "",
    };
  }

  componentWillUnmount() {
    clearTimeout(timer8);
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
      _id,
      email,
      ten,
      diachi,
      dienthoai,
      ghichu,
      thanhtoan,
      tongtien,
      trangthai,
    } = this.state;
    if (email.length === 0 || ten.length === 0 || diachi.length === 0 || dienthoai.length === 0) {
      this.setState({
        err: "Vui lòng nhập tất cả thông tin.",
      });
      timer8 = setTimeout(() => this.setState({ err: "" }), 4000);
    } else {
      const data = {
        id: _id,
        email: email,
        ten: ten,
        diachi: diachi,
        dienthoai: dienthoai,
        ghichu: ghichu,
        thanhtoan: thanhtoan,
        trangthai: trangthai,
        tongtien: tongtien,
      };
      const url = Global.link + "/webadmin/editorder";
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.data === 'success') {
          this.props.history.push("/admin/order");
        }
      });
    }
  };

  showPayment = () => {
    var result = null;
    var dataPayment = [
      "Thanh toán tiền mặt khi nhận hàng",
      "Thẻ tín dụng/Ghi nợ",
    ];

    result = dataPayment.map((item, index) => {
      return (
        <Dropdown.Item
          key={index}
          className="mydropdown-item account_active_dropdown"
          onSelect={() => {
            this.setState({
              thanhtoan: item,
            });
          }}
        >
          {item}
        </Dropdown.Item>
      );
    });
    return result;
  };

  showStatus = () => {
    var result = null;
    var dataStatus = [
      "Tiếp nhận đơn hàng",
      "Đang vận chuyển",
      'Giao hàng thành công'
    ];

    result = dataStatus.map((item, index) => {
      return (
        <Dropdown.Item
          key={index}
          className="mydropdown-item account_active_dropdown"
          onSelect={() => {
            this.setState({
              trangthai: item,
            });
          }}
        >
          {item}
        </Dropdown.Item>
      );
    });
    return result;
  };

  render() {
    const errJSX = (
      <div className="alert alert-danger alert-dismissible fade show mb-4">
        {this.state.err}
      </div>
    );

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

    const PaymentDropdown = (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {this.state.thanhtoan}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdowm-scroll-admin">
          {this.showPayment()}
        </Dropdown.Menu>
      </Dropdown>
    );

    const StatusDropdown = (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {this.state.trangthai}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdowm-scroll-admin">
          {this.showStatus()}
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
                    Chỉnh Sửa Thông Tin Đơn Hàng #{this.state._id}
                  </h6>
                </div>
                <div className="card-body">
                  <form>
                    <div class="row">
                      <div class="col-sm-6 col-12">
                        <div className="form-group">
                          <label> Email </label>
                          <input
                            placeholder="VD: nguyenvana@gmail.com"
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <label> Tên Khách Hàng </label>
                          <input
                            placeholder="VD: Nguyễn Văn A"
                            type="text"
                            className="form-control"
                            id="ten"
                            name="ten"
                            value={this.state.ten}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <label> Địa Chỉ </label>
                          <input
                            placeholder="VD: Ký túc xá khu A, Đại học Quốc gia TpHCM, Khu phố 6, Phường Linh Trung, Quận Thủ Đức, Thành phố Hồ Chí Minh"
                            type="text"
                            className="form-control"
                            id="diachi"
                            name="diachi"
                            value={this.state.diachi}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <label> Số Điện Thoại </label>
                          <input
                            placeholder="VD: 0123456789"
                            type="number"
                            className="form-control"
                            id="dienthoai"
                            name="dienthoai"
                            value={this.state.dienthoai}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div class="col-sm-6 col-12">
                        <div className="form-group">
                          <label> Hình Thức Thanh Toán </label>
                          {PaymentDropdown}
                        </div>
                        <div className="form-group">
                          <label> Trạng Thái </label>
                          {StatusDropdown}
                        </div>
                        <div className="form-group">
                          <label> Ghi Chú </label>
                          <input
                            placeholder="VD: Giao hàng ngoài giờ hành chính"
                            type="text"
                            className="form-control"
                            id="ghichu"
                            name="ghichu"
                            value={this.state.ghichu}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <label> Tổng Tiền </label>
                          <input
                            placeholder="VD: NXB Trẻ"
                            type="number"
                            className="form-control"
                            id="tongtien"
                            name="tongtien"
                            value={this.state.tongtien}
                            onChange={this.onChange}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    {this.state.err === '' ? null : errJSX}
                    <NavLink
                      to="/admin/order"
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

export default withRouter(EditDonHang);