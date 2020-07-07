import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/account.css";
import "../CSS/mystyle.css";
import Global from "./Global";
import MetaTags from "react-meta-tags";
import axios from "axios";
import qs from "qs";
import { Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

var timer4 = null;

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styleInput: "col-6 d-flex align-items-center border borderColor h-25",
      likeArr: [],
      name: Global.isSignIn ? Global.user[1] : Global.user[0].name,
      phone: Global.isSignIn ? Global.user[2] : Global.user[0].phone,
      showModal1: false,
      showModal2: false,
      loading: true,
      empty: false,
      password: "",
      password1: "",
      password2: "",
      noti: "",
      err: "",
      errPass: "",
      errNewPass: "",
      province: Global.isSignIn
        ? Global.user[3][0]._name
        : Global.user[0].address[0]._name,
      provinceItem: Global.isSignIn
        ? Global.user[3][0]
        : Global.user[0].address[0],
      district: Global.isSignIn
        ? Global.user[3][1]._name
        : Global.user[0].address[1]._name,
      districtItem: Global.isSignIn
        ? Global.user[3][1]
        : Global.user[0].address[1],
      ward: Global.isSignIn
        ? Global.user[3][2]._name
        : Global.user[0].address[2]._name,
      wardItem: Global.isSignIn ? Global.user[3][2] : Global.user[0].address[2],
      addressDetail: Global.isSignIn
        ? Global.user[3][3]
        : Global.user[0].address[3],
      provinceArr: [],
      districtArr: [],
      wardArr: [],
    };
  }

  componentDidMount = () => {
    this.getSuggest();
    this.getProvince();
  };

  componentWillUnmount() {
    clearTimeout(timer4);
  }

  hoverInput(bool) {
    if (bool) {
      this.setState({
        styleSearch:
          "col-6 d-flex align-items-center border borderColor h-25 search_box",
      });
    } else {
      this.setState({
        styleSearch: "col-6 d-flex align-items-center border borderColor h-25",
      });
    }
  }

  getSuggest = () => {
    const data = {
      email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
    };
    const url = Global.link + "product/listproductlike";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.datalike.length !== 0) {
        this.setState({
          likeArr: res.data.datalike,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          empty: true,
        });
      }
    });
  };

  onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleShow1 = (event) => {
    event.preventDefault();
    this.setState({ showModal1: true });
  };
  handleClose1 = () => {
    this.setState({ showModal1: false, password: "" });
  };
  handleShow2 = () => {
    this.setState({ showModal2: true });
  };
  handleClose2 = () => {
    this.setState({ showModal2: false, password1: "", password2: "" });
  };

  validatePhone(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        this.setState({
          noti: "Vui lòng chỉ nhập số",
        });
        timer4 = setTimeout(() => this.setState({ noti: "" }), 4000);
      }
    }
    this.setState({ phone: newText });
  }

  checkPass = (event) => {
    event.preventDefault();
    if (this.state.password.length !== 0) {
      const data = {
        email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
        password: this.state.password,
      };
      const url = Global.link + "user/checkpassword";
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.data === "success") {
          this.setState({
            password: "",
          });
          this.handleClose1();
          this.handleShow2();
        } else {
          this.setState({
            errPass: res.data.data,
          });
          timer4 = setTimeout(() => this.setState({ errPass: "" }), 4000);
        }
      });
    } else {
      this.setState({ errPass: "Vui lòng nhập mật khẩu cũ để đổi mật khẩu" });
      timer4 = setTimeout(() => this.setState({ errPass: "" }), 4000);
    }
  };

  changePass = (event) => {
    event.preventDefault();
    const { password1, password2 } = this.state;
    if (password1.length === 0 || password2.length === 0) {
      this.setState({
        errNewPass: "Vui lòng nhập tất cả thông tin.",
      });
      timer4 = setTimeout(() => this.setState({ errNewPass: "" }), 4000);
    } else if (password1.length < 3 || password1.length > 30) {
      this.setState({
        errNewPass: "Độ dài mật khẩu không hợp lệ. Yêu cầu ít nhất 3 ký tự",
      });
      timer4 = setTimeout(() => this.setState({ errNewPass: "" }), 4000);
    } else if (password1 !== password2) {
      this.setState({
        errNewPass: "Mật khẩu không trùng khớp.",
      });
      timer4 = setTimeout(() => this.setState({ errNewPass: "" }), 4000);
    } else {
      const data = {
        email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
        password: password1,
      };
      const url = Global.link + "user/changepassword";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.data === "success") {
          this.setState({
            noti: "Đổi mật khẩu thành công",
          });
          timer4 = setTimeout(() => this.setState({ noti: "" }), 4000);
          this.handleClose2();
        } else {
          this.setState({
            errNewPass: "Đã xảy ra lỗi, vui lòng thử lại",
          });
          timer4 = setTimeout(() => this.setState({ errNewPass: "" }), 4000);
        }
      });
    }
  };

  getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  currencyFormat = (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  numOfPage = (data) => {
    var lengthData = data.length;
    if (lengthData !== 0) {
      if (lengthData % 6 === 0) {
        return Math.floor(lengthData / 6);
      } else {
        return Math.floor(lengthData / 6) + 1;
      }
    }
  };

  show_6_like_prod = (arr_6prod) => {
    var result = null;
    result = arr_6prod.map((product, index) => {
      var discount = this.getRandom(5, 15);
      var newPrice = product.gia + (product.gia * discount) / 100;
      newPrice = Math.round(newPrice / 1000) * 1000;
      return (
        <div
          className="col-lg-2 col-md-3 col-sm-4 col-6 product_shadow my-2"
          key={index}
        >
          <NavLink to={"/product/" + product.tenurl}>
            <img
              src={product.hinhanhsanpham}
              className="img-fluid align-self-center"
              alt={product.tensp}
            />
            <div style={{ height: 50 }}>
              <p className="mb-2 book_item_title">{product.tensp}</p>
            </div>
            <div style={{ height: 18 }}>
              <p className="mb-0" style={{ color: "#616161" }}>
                <small className="book_item_title2">
                  {product.tacgia === " " ? null : product.tacgia}
                </small>
              </p>
            </div>

            <div className="row mt-2">
              <div className="col-6 d-flex align-items-center">
                <p className="mb-0">
                  <small
                    style={{
                      color: "#616161",
                      textDecoration: "line-through",
                    }}
                  >
                    {this.currencyFormat(newPrice.toString())} đ
                  </small>
                </p>
              </div>
              <div className="col-6 d-flex align-items-center">
                <p className="mb-0">
                  <small style={{ color: "#616161" }}>
                    {"-" + discount + "%"}
                  </small>
                </p>
              </div>
            </div>
            <h5
              className="textColor text-nowrap mb-0 pb-2"
              style={{ marginTop: -3 }}
            >
              <b>{this.currencyFormat(product.gia.toString())} đ</b>
            </h5>
          </NavLink>
        </div>
      );
    });
    return result;
  };

  show_like = () => {
    const { likeArr } = this.state;
    if (likeArr.length !== 0) {
      var numPage = this.numOfPage(likeArr);
      var page_arr = [];
      for (var i = 0; i < numPage; i++) {
        page_arr.push(i);
      }
      var result = null;
      result = page_arr.map((page, index) => {
        var start = index * 6;
        return (
          <div className="d-flex row px-2" key={index}>
            {this.show_6_like_prod(likeArr.slice(start, start + 6))}
          </div>
        );
      });
      return result;
    }
  };

  changeProfile = (event) => {
    event.preventDefault();
    const {
      name,
      phone,
      province,
      district,
      ward,
      addressDetail,
      provinceItem,
      districtItem, wardItem
    } = this.state;
    if (
      name.length === 0 ||
      phone.length !== 10 ||
      province === "Vui lòng chọn..." ||
      district === "Vui lòng chọn..." ||
      ward === "Vui lòng chọn..." ||
      addressDetail.length === 0
    ) {
      this.setState({
        err: "Vui lòng nhập tất cả thông tin.",
      });
      timer4 = setTimeout(() => this.setState({ err: "" }), 4000);
    } else if (name.length > 50) {
      this.setState({
        err: "Chiều dài Tên vượt quá giới hạn cho phép 50 ký tự.",
      });
      timer4 = setTimeout(() => this.setState({ err: "" }), 4000);
    } else if (
      wardItem._province_id !== provinceItem.id ||
      wardItem._district_id !== districtItem.id
    ) {
      this.setState({
        err: "Vui lòng kiểm tra lại thông tin địa chỉ",
      });
      timer4 = setTimeout(() => this.setState({ err: "" }), 4000);
    } else {
      var address = [provinceItem, districtItem, wardItem, addressDetail];
      const data = {
        email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
        name: name,
        phone: phone,
      };
      const url = Global.link + "user/changeprofile";
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.data === "success") {
          this.setState({
            noti: "Cập nhật thông tin thành công.",
          });
          timer4 = setTimeout(() => this.setState({ noti: "" }), 4000);
          
          if (!Global.isSignIn) {
            var email = Global.user[0].email;
            var name = this.state.name;
            var picture = Global.user[0].picture;
            var phone = this.state.phone;
            var user = [{ email, name, picture, phone, address }];
            Global.user = user;
            localStorage.setItem("user", JSON.stringify(user));
          } else {
            Global.user = [Global.user[0], this.state.name, this.state.phone, address];
            localStorage.setItem(
              "user",
              JSON.stringify([
                Global.user[0],
                this.state.name,
                this.state.phone,
                address,
              ])
            );
          }
        } else {
          this.setState({
            err: "Đã xảy ra lỗi, vui lòng thử lại",
          });
          timer4 = setTimeout(() => this.setState({ err: "" }), 4000);
        }
      });
    }
  };

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

    const emptyLikeJSX = (
      <div className="pl-5 pb-3">
        <p style={{ display: "inline" }}>Chưa có sản phẩm yêu thích nào. </p>
        <NavLink to="/" className="textColor">
          <b>Về trang chủ</b>
        </NavLink>
      </div>
    );

    const bodyLikeJSX = <div>{this.show_like()}</div>;

    const loadingJSX = (
      <div className="p-3 mt-3 d-flex justify-content-center">
        <img
          src={require("../images/loading.gif")}
          className="img-fluid align-self-center"
          alt="loading"
          width="200px"
        />
      </div>
    );

    const notiJSX = (
      <div className="alert alert-success alert-dismissible fade show mt-3 mb-0 mx-3">
        {this.state.noti}
        <button
          onClick={this.closeNoti}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );

    const errJSX = (
      <div className="alert alert-danger alert-dismissible fade show mt-3 mb-0 mx-3">
        {this.state.err}
        <button
          onClick={this.closeNoti}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );

    const errPassJSX = (
      <div className="alert alert-danger alert-dismissible fade show">
        {this.state.errPass}
      </div>
    );

    const errNewPassJSX = (
      <div className="alert alert-danger alert-dismissible fade show">
        {this.state.errNewPass}
      </div>
    );

    const provinceDropdown = (
      <Dropdown className="col-sm-9">
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
        className="col-sm-9"
        onToggle={() => {
          if (this.state.province === "Vui lòng chọn...") {
            this.setState({ err: "Vui lòng chọn Tỉnh/Thành phố" });
            timer4 = setTimeout(() => this.setState({ err: "" }), 4000);
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
        className="col-sm-9"
        onToggle={() => {
          if (
            this.state.province === "Vui lòng chọn..." ||
            this.state.district === "Vui lòng chọn..."
          ) {
            this.setState({
              err: "Vui lòng chọn Tỉnh/Thành phố và Quận/Huyện",
            });
            timer4 = setTimeout(() => this.setState({ err: "" }), 4000);
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

    return (
      <div>
        <MetaTags>
          <title>Thông tin tài khoản | mybookstore.online</title>
          <meta
            property="og:url"
            content="https://mybookstore.online/account"
          />
          <meta property="og:type" content="website" />
          <meta
            name="description"
            content="Thỏa sức mua sắm qua mạng với hàng ngàn mặt hàng sách tại mybookstore.online với giá rẻ hơn và nhiều ưu đãi hấp dẫn."
          />
          <meta
            property="og:title"
            content="Thông tin tài khoản | mybookstore.online"
          />
          <meta
            property="og:image"
            content={
              Global.isSignIn
                ? require("../images/avatar_default.png")
                : Global.user[0].picture
            }
          />
        </MetaTags>

        {/*Path*/}
        <div className="container py-2 pl-2">
          <NavLink to="/">
            <p className="path float-left">Trang chủ /{"\u00A0"}</p>
          </NavLink>
          <p className="path textColor">Thông tin tài khoản</p>
        </div>

        <div className="container bg-white">
          {/* Thông tin tài khoản */}
          <div id="thongtintaikhoan">
            <h5 className="pt-3 pl-2">THÔNG TIN TÀI KHOẢN</h5>
            <div className="row">
              <div className="col-md-3 text-center">
                <img
                  src={
                    Global.isSignIn
                      ? require("../images/avatar_default_2.png")
                      : Global.user[0].picture
                  }
                  className="p-3"
                  alt="User Avatar"
                  height="210px"
                />
              </div>
              <div className="col-md-9">
                <form>
                  <div className="form-group row pl-3 pr-3">
                    <label htmlFor="name" className="col-sm-3 col-form-label">
                      Tên
                    </label>
                    <div className="col-sm-9">
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
                  <div className="form-group row pl-3 pr-3">
                    <label htmlFor="email" className="col-sm-3 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        defaultValue={
                          Global.isSignIn
                            ? Global.user[0]
                            : Global.user[0].email
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group row pl-3 pr-3">
                    <label htmlFor="phone" className="col-sm-3 col-form-label">
                      Số điện thoại
                    </label>
                    <div className="col-sm-9">
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
                  <div className="form-group row pl-3 pr-3">
                    <label
                      htmlFor="inputAddress1"
                      className="col-sm-3 col-form-label"
                    >
                      Tỉnh/Thành phố
                    </label>
                    {provinceDropdown}
                  </div>
                  <div className="form-group row pl-3 pr-3">
                    <label
                      htmlFor="inputAddress2"
                      className="col-sm-3 col-form-label"
                    >
                      Quận/Huyện
                    </label>
                    {districtDropdown}
                  </div>
                  <div className="form-group row pl-3 pr-3">
                    <label
                      htmlFor="inputAddress3"
                      className="col-sm-3 col-form-label"
                    >
                      Phường/Xã
                    </label>
                    {wardDropdown}
                  </div>
                  <div className="form-group row pl-3 pr-3">
                    <label
                      htmlFor="inputAddress4"
                      className="col-sm-3 col-form-label"
                    >
                      Địa chỉ
                    </label>
                    <div className="col-sm-9">
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
                  {this.state.noti === "" ? null : notiJSX}
                  {this.state.err === "" ? null : errJSX}

                  {Global.isSignIn ? (
                    <div className="viewmore pb-2 mt-2">
                      <button
                        className="btn btn-danger mybtn mr-2"
                        onClick={this.handleShow1}
                      >
                        Đổi mật khẩu
                      </button>
                      <button
                        className="btn btn-danger mybtn ml-2"
                        onClick={this.changeProfile}
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  ) : (
                    <div className="viewmore pb-2 mt-2">
                      <button
                        className="btn btn-danger mybtn"
                        onClick={this.changeProfile}
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container bg-white mt-3">
          {/* Yêu thích */}
          <div id="yeuthich">
            <h5 className="pt-3 pl-2">YÊU THÍCH</h5>
            {this.state.loading ? loadingJSX : null}
            {this.state.empty ? emptyLikeJSX : null}
            {this.state.likeArr.length !== 0 ? bodyLikeJSX : null}
          </div>
        </div>

        <Modal show={this.state.showModal1} onHide={this.handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận mật khẩu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Vui lòng nhập mật khẩu cũ để đổi mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              {this.state.errPass === "" ? null : errPassJSX}
              <div className="viewmore pb-2 mt-2">
                <button
                  className="btn btn-danger mybtn"
                  onClick={this.checkPass}
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.showModal2} onHide={this.handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Đổi mật khẩu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="password1"
                  name="password1"
                  value={this.state.password1}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Nhập lại mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
              </div>
              {this.state.errNewPass === "" ? null : errNewPassJSX}
              <div className="viewmore pb-2 mt-2">
                <button
                  className="btn btn-danger mybtn"
                  onClick={this.changePass}
                >
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
