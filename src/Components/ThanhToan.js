import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { withRouter, NavLink } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import Global from "./Global";
import MetaTags from "react-meta-tags";

import "../CSS/style.css";

var timer3 = null;

export class ThanhToan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      total: 0,
      ship: 0,
      name: Global.isSignIn ? Global.user[1] : Global.user[0].name,
      phone: Global.isSignIn ? Global.user[2] : "",
      email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
      province: "Vui lòng chọn...",
      provinceItem: 0,
      district: "Vui lòng chọn...",
      districtItem: 0,
      ward: "Vui lòng chọn...",
      wardItem: 0,
      addressDetail: "",
      note: " ",
      provinceArr: [],
      districtArr: [],
      wardArr: [],
      err: "",
      radio: "Thanh toán tiền mặt khi nhận hàng",
    };
  }

  componentDidMount() {
    this.getProvince();
    this.getCart();
  }

  componentWillUnmount() {
    clearTimeout(timer3);
  }

  datHang = () => {
    const {
      name,
      email,
      phone,
      province,
      provinceItem,
      district,
      districtItem,
      ward,
      wardItem,
      total,
      addressDetail,
      note,
      radio,
    } = this.state;
    if (
      name.length === 0 ||
      addressDetail.length === 0 ||
      phone.length !== 10 ||
      province === '"Vui lòng chọn..."' ||
      district === "Vui lòng chọn..." ||
      ward === "Vui lòng chọn..."
    ) {
      this.setState({
        err: "Vui lòng nhập tất cả thông tin.",
      });
      timer3 = setTimeout(() => this.setState({ err: "" }), 4000);
    } else if (name.length > 50) {
      this.setState({
        err: "Chiều dài Tên vượt quá giới hạn cho phép 50 ký tự.",
      });
      timer3 = setTimeout(() => this.setState({ err: "" }), 4000);
    } else if (
      wardItem._province_id !== provinceItem.id ||
      wardItem._district_id !== districtItem.id
    ) {
      this.setState({
        err: "Vui lòng kiểm tra lại thông tin địa chỉ",
      });
      timer3 = setTimeout(() => this.setState({ err: "" }), 4000);
    } else {
      var diachi =
        addressDetail +
        ", " +
        wardItem._prefix +
        " " +
        wardItem._name +
        ", " +
        districtItem._prefix +
        " " +
        districtItem._name +
        ", " +
        provinceItem._name;
      const data = {
        email: email,
        ten: name,
        diachi: diachi,
        dienthoai: phone,
        ghichu: note,
        thanhtoan: radio,
        tongtien: total
      };
      const url = Global.link + "orther/orther";
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.data !== 'error') {
          console.log('Thanh toan thanh cong');
          this.props.history.push("/bill/" + res.data.data);
        }
      });
    }
  };

  onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value,
    });
  };

  currencyFormat = (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  getCart = () => {
    const data = {
      email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
    };
    const url = Global.link + "cart/showcart";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      this.setState({
        cart: res.data.data,
      });
      this.calTotal();
    });
  };

  show_cart = () => {
    var result = null;
    if (this.state.cart.length > 0) {
      result = this.state.cart.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.tensp}</td>
            <td>
              <img
                src={item.hinhanhsanpham}
                className="img-fluid align-self-center"
                alt="book1"
                width="60px"
              />
            </td>
            <td>{item.soluongsanpham}</td>
            <td style={{ whiteSpace: "nowrap" }}>
              {this.currencyFormat((item.gia * item.soluongsanpham).toString())}{" "}
              đ
            </td>
          </tr>
        );
      });
    }
    return result;
  };

  calTotal() {
    var t = 0;
    for (var i = 0; i < this.state.cart.length; i++) {
      t += this.state.cart[i].soluongsanpham * this.state.cart[i].gia;
    }
    this.setState({ total: t });
  }

  getProvince = () => {
    axios
      .get(Global.linkAddress + "download_province")
      .then((response) => {
        this.setState({
          provinceArr: response.data.res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setProvince = (province) => {
    this.setState({
      province: province._name,
      provinceItem: province,
    });
  };

  showProvince = () => {
    var result = null;
    if (this.state.provinceArr.length !== 0) {
      result = this.state.provinceArr.map((province, index) => {
        return (
          <Dropdown.Item
            key={index}
            className="mydropdown-item account_active_dropdown"
            onSelect={() => {
              this.setProvince(province);
              this.getDistrict(province.id);
            }}
          >
            {province._name}
          </Dropdown.Item>
        );
      });
    } else {
      return null;
    }
    return result;
  };

  getDistrict = (provinceID) => {
    axios
      .get(Global.linkAddress + "download_district/" + provinceID)
      .then((response) => {
        this.setState({
          districtArr: response.data.res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setDistrict = (district) => {
    this.setState({
      district: district._name,
      districtItem: district,
    });
  };

  showDistrict = () => {
    var result = null;
    if (this.state.districtArr.length !== 0) {
      result = this.state.districtArr.map((district, index) => {
        return (
          <Dropdown.Item
            key={index}
            className="mydropdown-item account_active_dropdown"
            onSelect={() => {
              this.setDistrict(district);
              this.getWard(district.id);
            }}
          >
            {district._prefix + " " + district._name}
          </Dropdown.Item>
        );
      });
    } else {
      return null;
    }
    return result;
  };

  getWard = (districtID) => {
    axios
      .get(Global.linkAddress + "download_ward/" + districtID)
      .then((response) => {
        this.setState({
          wardArr: response.data.res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setWard = (ward) => {
    this.setState({
      ward: ward._name,
      wardItem: ward,
    });
  };

  showWard = () => {
    var result = null;
    if (this.state.wardArr.length !== 0) {
      result = this.state.wardArr.map((ward, index) => {
        return (
          <Dropdown.Item
            key={index}
            className="mydropdown-item account_active_dropdown"
            onSelect={() => this.setWard(ward)}
          >
            {ward._prefix + " " + ward._name}
          </Dropdown.Item>
        );
      });
    } else {
      return null;
    }
    return result;
  };

  validatePhone(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        this.setState({
          err: "Vui lòng chỉ nhập số",
        });
        timer3 = setTimeout(() => this.setState({ err: "" }), 4000);
      }
    }
    this.setState({ phone: newText });
  }

  render() {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href="# "
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <div className="form-control dropdown-add">{children}</div>
      </a>
    ));

    const provinceDropdown = (
      <Dropdown className="col-sm-8">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {this.state.province}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdowm-scroll">
          {this.showProvince()}
        </Dropdown.Menu>
      </Dropdown>
    );

    const districtDropdown = (
      <Dropdown
        className="col-sm-8"
        onToggle={() => {
          if (this.state.province === "Vui lòng chọn...") {
            this.setState({ err: "Vui lòng chọn Tỉnh/Thành phố" });
            timer3 = setTimeout(() => this.setState({ err: "" }), 4000);
          }
        }}
      >
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {this.state.district}
        </Dropdown.Toggle>

        {this.state.districtArr.length === 0 ? null : (
          <Dropdown.Menu className="dropdowm-scroll">
            {this.showDistrict()}
          </Dropdown.Menu>
        )}
      </Dropdown>
    );

    const wardDropdown = (
      <Dropdown
        className="col-sm-8"
        onToggle={() => {
          if (
            this.state.province === "Vui lòng chọn..." ||
            this.state.district === "Vui lòng chọn..."
          ) {
            this.setState({
              err: "Vui lòng chọn Tỉnh/Thành phố và Quận/Huyện",
            });
            timer3 = setTimeout(() => this.setState({ err: "" }), 4000);
          }
        }}
      >
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {this.state.ward}
        </Dropdown.Toggle>

        {this.state.districtArr.length === 0 ? null : (
          <Dropdown.Menu className="dropdowm-scroll">
            {this.showWard()}
          </Dropdown.Menu>
        )}
      </Dropdown>
    );

    const errJSX = (
      <div className="alert alert-danger alert-dismissible fade show">
        {this.state.err}
      </div>
    );

    var title = "https://uit-hotelbooking.000webhostapp.com/logo.png";
    if (this.state.cart.length !== 0) {
      title = this.state.cart[0].hinhanhsanpham;
    }

    return (
      <div className="container-fluid background2">
        <MetaTags>
          <title>Thông tin thanh toán | mybookstore.online</title>
          <meta property="og:url" content="https://mybookstore.online/pay" />
          <meta property="og:type" content="website" />
          <meta
            name="description"
            content="Thỏa sức mua sắm qua mạng với hàng ngàn mặt hàng sách tại mybookstore.online với giá rẻ hơn và nhiều ưu đãi hấp dẫn."
          />
          <meta
            property="og:title"
            content="Thông tin thanh toán | mybookstore.online"
          />
          <meta property="og:image" content={title} />
        </MetaTags>

        {/*Path*/}
        <div className="container py-2 px-0">
          <NavLink to="/">
            <p className="path float-left">Trang chủ /{"\u00A0"}</p>
          </NavLink>
          <NavLink to="/cart">
            <p className="path float-left">Giỏ hàng /{"\u00A0"}</p>
          </NavLink>
          <p className="path textColor">Thanh toán</p>
        </div>

        {/*Main*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-5 pl-0">
              {/*Thong tin dia chi*/}
              <div className="bg-white">
                <div className="text-center text-light background1 p-1">
                  <p className="header">THÔNG TIN ĐỊA CHỈ</p>
                </div>
                <form className="p-3">
                  <div className="form-group row">
                    <label
                      htmlFor="inputName"
                      className="col-sm-4 col-form-label"
                    >
                      Họ và tên
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPhone"
                      className="col-sm-4 col-form-label"
                    >
                      Điện thoại
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={this.state.phone}
                        onChange={(text) =>
                          this.validatePhone(text.target.value)
                        }
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputEmail"
                      className="col-sm-4 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={this.state.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputAddress1"
                      className="col-sm-4 col-form-label"
                    >
                      Tỉnh/Thành phố
                    </label>
                    {provinceDropdown}
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputAddress2"
                      className="col-sm-4 col-form-label"
                    >
                      Quận/Huyện
                    </label>
                    {districtDropdown}
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputAddress3"
                      className="col-sm-4 col-form-label"
                    >
                      Phường/Xã
                    </label>
                    {wardDropdown}
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputAddress4"
                      className="col-sm-4 col-form-label"
                    >
                      Địa chỉ
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="addressDetail"
                        name="addressDetail"
                        value={this.state.addressDetail}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputMessage"
                      className="col-sm-4 col-form-label"
                    >
                      Lời nhắn (Tùy chọn)
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="note"
                        name="note"
                        value={this.state.note}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  {this.state.err === "" ? null : errJSX}
                </form>
              </div>
              {/*Phuong thuc thanh toan*/}
              <div className="bg-white mb-3">
                <div className="text-center text-light background1 p-1 mt-3">
                  <p className="header">PHƯƠNG THỨC THANH TOÁN</p>
                </div>
                <div className="mt-3 ml-4">
                  <label className="radio mb-0">
                    <p className="deliveryTime pb-0">
                      Thanh toán tiền mặt khi nhận hàng
                    </p>
                    <input
                      type="radio"
                      name="radio"
                      value={"Thanh toán tiền mặt khi nhận hàng"}
                      onChange={this.onChange}
                      checked={
                        this.state.radio === "Thanh toán tiền mặt khi nhận hàng"
                      }
                    />
                    <span className="checkround" />
                  </label>
                  <label className="radio mb-0">
                    <p className="deliveryTime pb-0">Thẻ Tín dụng/Ghi nợ</p>
                    <input
                      type="radio"
                      name="radio"
                      value={"Thẻ Tín dụng/Ghi nợ"}
                      onChange={this.onChange}
                      checked={this.state.radio === "Thẻ Tín dụng/Ghi nợ"}
                    />
                    <span className="checkround" />
                  </label>
                </div>
              </div>
            </div>
            {/*Kiem tra don hang*/}
            <div className="col-sm-7 mb-3 bg-white p-0">
              {/*Header Kiem tra don hang*/}
              <div className="text-center text-light background1 p-1">
                <p className="header">KIỂM TRA ĐƠN HÀNG</p>
              </div>
              {/*Table Kiem tra don hang*/}
              <div className="m-3">
                <table className="table mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th>Tên</th>
                      <th style={{ whiteSpace: "nowrap" }}>Hình ảnh</th>
                      <th style={{ whiteSpace: "nowrap" }}>Số lượng</th>
                      <th style={{ whiteSpace: "nowrap" }}>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.show_cart()}
                    {/*Tinh tien*/}
                    <tr>
                      <td
                        colSpan={3}
                        className="font-weight-bold"
                        style={{
                          whiteSpace: "nowrap",
                          textAlign: "right",
                        }}
                      >
                        <p className="pt-3">Thành tiền</p>
                        <p>Phí vận chuyển</p>
                        <p>Tổng cộng</p>
                      </td>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          textAlign: "right",
                        }}
                      >
                        <p className="pt-3">
                          {this.currencyFormat(this.state.total.toString())} đ
                        </p>
                        <p>
                          {this.currencyFormat(this.state.ship.toString())} đ
                        </p>
                        <p
                          className="font-weight-bold"
                          style={{ color: "#eb2b3f" }}
                        >
                          {this.currencyFormat(
                            (this.state.ship + this.state.total).toString()
                          )}{" "}
                          đ
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr className="mt-0" />
                <div className="row">
                  <div className="col">
                    <button
                      type="submit"
                      className="btn btn-outline-danger mybtn-outline "
                      id="submitForm"
                    >
                      <span style={{ fontSize: "20px" }} onClick={this.datHang}>
                        Xác nhận đơn hàng
                      </span>
                    </button>
                  </div>
                </div>
                <span style={{ color: "gray" }} className="mt-2">
                  Quý khách vui lòng kiểm tra kỹ hàng hóa khi nhận.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ThanhToan);