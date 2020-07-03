/* eslint-disable no-useless-escape */
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { Modal } from "react-bootstrap";
import Badge from "@material-ui/core/Badge";

import "../CSS/style.css";
import Global from "./Global";
import FBicon from "./FBicon";

var timer = null;

export class Header extends Component {
  constructor(props) {
    super(props);

    var user = [], cart = 0;
    if (localStorage !== null) {
      if (localStorage.getItem("user") !== null) {
        user = JSON.parse(localStorage.getItem("user"));
        Global.user = user;
        if (user.length === 1) {
          Global.isLoggedInS = true;
        } else {
          Global.isSignIn = true;
        }
      }
      if (localStorage.getItem("cart") !== null) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }

    this.state = {
      styleSearch: "form-control myinput-outline border borderColor w-75",
      nameU: "",
      emailU: "",
      pass1U: "",
      pass2U: "",
      phoneU: "",
      isSignUpSuccess: false,
      err: "",
      verifyCode: "",
      errVerify: "",
      chooseSignIn: true,
      passI: "",
      emailI: "",
      errInputSignUp: "",
      errInputSignIn: "",
      userName:
        user.length === 0
          ? "Đăng nhập"
          : user.length === 1
          ? user[0].name
          : user[1],
      cart: cart,
      isLoggedInF: false,
      userIDS: "",
      nameS: "",
      emailS: "",
      pictureS: "",
      showModal: false,
      isLoggedInG: false,
      emailForgot: "",
      errForgot: "",
      showModalForgot: false,
      search: "",
    };
  }

  forgotPass = (event) => {
    event.preventDefault();
    const { emailForgot } = this.state;
    if (emailForgot.length === 0) {
      this.setState({
        errForgot: "Vui lòng nhập Email.",
      });
      timer = setTimeout(() => this.setState({ errForgot: "" }), 4000);
    } else if (!this.validateEmail(emailForgot)) {
      this.setState({
        errForgot: "Email không đúng định dạng.",
      });
      timer = setTimeout(() => this.setState({ errForgot: "" }), 4000);
    } else {
      const data = { email: this.state.emailForgot };
      const url = Global.link + "user/forgotpassword";
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.err === "success") {
          this.setState({
            errForgot: "Vui lòng kiểm tra email để nhận mật khẩu mới",
            chooseSignIn: true,
            isSignUpSuccess: false,
          });
          timer = setTimeout(() => {
            this.setState({
              errForgot: "",
              emailForgot: "",
            });
            this.closeModalForgot();
            this.openModal();
          }, 4000);
        } else {
          this.setState({
            errForgot: res.data.err,
          });
          timer = setTimeout(() => this.setState({ errForgot: "" }), 4000);
        }
      });
    }
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      isSignUpSuccess: false,
      err: "",
      chooseSignIn: true,
      passI: "",
      emailI: "",
      verifyCode: "",
    });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModalForgot = () => {
    this.setState({
      showModalForgot: false,
      emailForgot: "",
    });
  };

  openModalForgot = () => {
    this.closeModal();
    this.setState({ showModalForgot: true });
  };

  loginSocialNetwork = (id, name, email, picture) => {
    const data = {
      id: id,
      name: name,
      email: email,
      picture: picture,
    };
    const url = Global.link + "user/socialnetwork";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.err === "Data is added to database") {
        //res.data.datacount
        this.setState({ userName: name });
        var phone = '';
        if (res.data.dataphone !== undefined) {
          phone = res.data.dataphone
        }
        var user = [{ email, name, picture, phone }];
        Global.user = user;
        Global.isLoggedInS = true;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("cart", JSON.stringify(0));
        this.closeModal();
      } else {
        this.setState({
          errInputSignIn: res.data.err,
        });
        timer = setTimeout(() => this.setState({ errInputSignIn: "" }), 4000);
      }
    });
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      chooseSignIn: true,
      isSignUpSuccess: false,
      userName: "Đăng nhập",
    });
    Global.isSignIn = false;
    Global.isLoggedInS = false;
    Global.user = [];

    const url = Global.link + "user/logout";
    const options = {
      method: "GET",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
    };
    axios(options).then((res) => {
      console.log(res.data.err);
    });
    this.props.history.push("/");
    window.location.reload();
  };

  responseFacebook = (response) => {
    if (response.status !== "unknown") {
      //console.log(response);
      this.setState({
        isLoggedInF: true,
        userIDS: response.userID,
        nameS: response.name,
        emailS: response.email,
        pictureS: response.picture.data.url,
      });
      this.loginSocialNetwork(
        response.userID,
        response.name,
        response.email,
        response.picture.data.url
      );
    }
  };

  responseGoogle = (response) => {
    //console.log(response);
    this.setState({
      isLoggedInG: true,
      userIDS: response.profileObj.googleId,
      nameS: response.profileObj.name,
      emailS: response.profileObj.email,
      pictureS: response.profileObj.imageUrl,
    });
    this.loginSocialNetwork(
      response.profileObj.googleId,
      response.profileObj.name,
      response.profileObj.email,
      response.profileObj.imageUrl
    );
  };

  componentWillUnmount() {
    clearTimeout(timer);
  }

  signIn = (event) => {
    event.preventDefault();
    const { emailI, passI } = this.state;
    if (passI.length === 0 || emailI.length === 0) {
      this.setState({
        errInputSignIn: "Vui lòng nhập tất cả thông tin.",
      });
      timer = setTimeout(() => this.setState({ errInputSignIn: "" }), 4000);
    } else if (!this.validateEmail(emailI)) {
      this.setState({
        errInputSignIn: "Email không đúng định dạng.",
      });
      timer = setTimeout(() => this.setState({ errInputSignIn: "" }), 4000);
    } else {
      const data = {
        email: emailI,
        password: passI,
      };
      const url = Global.link + "user/login";
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.err === undefined) {
          //phan tu thu 4
          this.setState({ userName: res.data.data[1] });
          Global.user = res.data.data;
          Global.isSignIn = true;
          this.closeModal();
          localStorage.setItem("user", JSON.stringify(res.data.data));
          localStorage.setItem("cart", JSON.stringify(0));
        }
        if (res.data.err === "Please verify your account") {
          this.setState({
            chooseSignIn: false,
            isSignUpSuccess: true,
          });
        } else {
          this.setState({
            errInputSignIn: res.data.err,
          });
          timer = setTimeout(() => this.setState({ errInputSignIn: "" }), 4000);
        }
      });
    }
  };

  toggleForm = (data) => {
    if (data === 1) {
      this.setState({
        chooseSignIn: true,
      });
    } else if (data === 2) {
      this.setState({
        chooseSignIn: false,
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

  validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  validatePhone(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        this.setState({
          errInputSignUp: "Vui lòng chỉ nhập số",
        });
        timer = setTimeout(() => this.setState({ errInputSignUp: "" }), 4000);
      }
    }
    this.setState({ phoneU: newText });
  }

  signUp = (event) => {
    event.preventDefault();
    const { nameU, emailU, pass1U, pass2U, phoneU } = this.state;
    if (
      nameU.length === 0 ||
      emailU.length === 0 ||
      pass1U.length === 0 ||
      pass2U.length === 0 ||
      phoneU.length === 0
    ) {
      this.setState({
        errInputSignUp: "Vui lòng nhập tất cả thông tin.",
      });
      timer = setTimeout(() => this.setState({ errInputSignUp: "" }), 4000);
    } else if (nameU.length > 50) {
      this.setState({
        errInputSignUp: "Chiều dài Tên vượt quá giới hạn cho phép 50 ký tự.",
      });
      timer = setTimeout(() => this.setState({ errInputSignUp: "" }), 4000);
    } else if (!this.validateEmail(emailU)) {
      this.setState({
        errInputSignUp: "Email không đúng định dạng.",
      });
      timer = setTimeout(() => this.setState({ errInputSignUp: "" }), 4000);
    } else if (pass1U.length < 3 || pass1U.length > 30) {
      this.setState({
        errInputSignUp: "Độ dài mật khẩu không hợp lệ. Yêu cầu ít nhất 3 ký tự",
      });
      timer = setTimeout(() => this.setState({ errInputSignUp: "" }), 4000);
    } else if (pass1U !== pass2U) {
      this.setState({
        errInputSignUp: "Mật khẩu không trùng khớp.",
      });
      timer = setTimeout(() => this.setState({ errInputSignUp: "" }), 4000);
    } else {
      const data = {
        email: emailU,
        name: nameU,
        password: pass1U,
        password_confirm: pass2U,
        phone: phoneU,
      };
      const url = Global.link + "user/register";
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.err === undefined) {
          this.setState({
            isSignUpSuccess: true,
          });
        } else {
          this.setState({
            err: res.data.err,
          });
        }
      });
    }
  };

  verifyEmail = (event) => {
    event.preventDefault();
    const { verifyCode } = this.state;
    const data = {
      secretToken: verifyCode,
    };
    const url = Global.link + "user/verify";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.err === undefined) {
        alert("Your account is verify, please login");
        this.setState({
          chooseSignIn: true,
        });
      } else {
        this.setState({
          errVerify: res.data.err,
        });
      }
    });
  };

  hoverSearch(bool) {
    if (bool) {
      this.setState({
        styleSearch: "border borderColor form-control search_box w-75",
      });
    } else {
      this.setState({
        styleSearch: "border borderColor form-control w-75",
      });
    }
  }

  search = (event) => {
    event.preventDefault();
    if (this.state.search.length !== 0) {
      this.props.history.push("/search/" + this.state.search);
      window.location.reload();
    }
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter" && this.state.search.length !== 0) {
      this.props.history.push("/search/" + this.state.search);
      window.location.reload();
    }
  };

  render() {
    let fbContent = (
      <FacebookLogin
        appId="633365450854482"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.responseFacebook}
        cssClass="facebook-button align-text-bottom p-0"
        icon={<FBicon />}
      />
    );

    let ggContent = (
      <GoogleLogin
        clientId="305691499424-f0r1ur6lj5ficj6dtntcfr4dj6t2uekg.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn btn-danger btn-google"
          >
            <i className="fab fa-google-plus-g" /> Google
          </button>
        )}
        onSuccess={this.responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    );

    const errJSX = (
      <div className="alert alert-danger alert-dismissible fade show">
        {this.state.err}
      </div>
    );

    const errForgotJSX = (
      <div className="alert alert-danger alert-dismissible fade show">
        {this.state.errForgot}
      </div>
    );

    const errInputSignUpJSX = (
      <div className="alert alert-danger alert-dismissible fade show">
        {this.state.errInputSignUp}
      </div>
    );

    const errInputSignInJSX = (
      <div className="alert alert-danger alert-dismissible fade show">
        {this.state.errInputSignIn}
      </div>
    );

    const errVerifyJSX = (
      <div className="alert alert-danger alert-dismissible fade show">
        {this.state.errVerify}
      </div>
    );

    const signup = (
      <form>
        {this.state.errInputSignUp === "" ? null : errInputSignUpJSX}
        <div className="form-group">
          {this.state.err === "" ? null : errJSX}
          <label htmlFor="exampleInputName">Tên</label>
          <input
            type="text"
            className="form-control"
            id="nameU"
            name="nameU"
            value={this.state.name}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" style={{ color: "#7d7d7d" }}>
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailU"
            name="emailU"
            value={this.state.email}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" style={{ color: "#7d7d7d" }}>
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="pass1U"
            name="pass1U"
            value={this.state.pass1}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2" style={{ color: "#7d7d7d" }}>
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="pass2U"
            name="pass2U"
            value={this.state.pass2}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPhone" style={{ color: "#7d7d7d" }}>
            Số điện thoại
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneU"
            name="phoneU"
            value={this.state.phone}
            onChange={(text) => this.validatePhone(text.target.value)}
            maxLength={10}
          />
        </div>
        <div className="viewmore pb-2 mt-2">
          <button className="btn btn-danger mybtn" onClick={this.signUp}>
            Đăng ký
          </button>
        </div>
        <div className="form-group mt-4">
          <div>
            <label
              htmlFor="facebook-google"
              style={{
                textAlign: "center",
                display: "block",
                color: '#7d7d7d'
              }}
            >
              Đăng nhập bằng
            </label>
          </div>
          <div className="row text-nowrap">
            <div className="col-6 d-flex justify-content-end">{fbContent}</div>
            <div className="col-6">{ggContent}</div>
          </div>
        </div>
      </form>
    );

    const verifyEmail = (
      <div>
        <div className="modal-header">
          <h5 style={{ color: "#EB2B3F" }}>Xác nhận email</h5>
        </div>
        {this.state.errVerify === "" ? null : errVerifyJSX}
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label>Nhập mã xác thực được gửi đến email của bạn</label>
              <input
                type="text"
                className="form-control"
                id="verifyCode"
                name="verifyCode"
                value={this.state.verifyCode}
                onChange={this.onChange}
              />
            </div>
            <div className="viewmore pb-2 mt-2">
              <button
                className="btn btn-danger mybtn"
                onClick={this.verifyEmail}
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    );

    const signInJSX = (
      <form>
        {this.state.errInputSignIn === "" ? null : errInputSignInJSX}
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" style={{ color: "#7d7d7d" }}>
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailI"
            name="emailI"
            value={this.state.emailI}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" style={{ color: "#7d7d7d" }}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passI"
            name="passI"
            value={this.state.passI}
            onChange={this.onChange}
          />
        </div>
        <a
          href="# "
          data-toggle="modal"
          data-target="#modal-forget"
          data-dismiss="modal"
          className="textColor"
          onClick={this.openModalForgot}
        >
          <u>Quên mật khẩu?</u>
        </a>
        <div className="viewmore pb-2 mt-2">
          <button
            className="btn btn-danger mybtn"
            onClick={this.signIn}
            data-dismiss={this.state.userName === "Đăng nhập" ? "" : "modal"}
          >
            Đăng nhập
          </button>
        </div>
        <div className="form-group mt-4">
          <div>
            <label
              htmlFor="facebook-google"
              style={{
                textAlign: "center",
                display: "block",
                color: '#7d7d7d'
              }}
            >
              Đăng nhập bằng
            </label>
          </div>
          <div className="row text-nowrap">
            <div className="col-6 d-flex justify-content-end">{fbContent}</div>
            <div className="col-6">{ggContent}</div>
          </div>
        </div>
      </form>
    );

    const signUpJSX = this.state.isSignUpSuccess ? verifyEmail : signup;

    const userDropdown = (
      <div className="dropdown-menu">
        <NavLink
          className="dropdown-item mydropdown-item account_active_dropdown"
          to="/account"
        >
          <i className="fas fa-id-badge"></i> Thông tin tài khoản
        </NavLink>
        <NavLink
          className="dropdown-item mydropdown-item account_active_dropdown"
          to="/order-history"
        >
          <i className="fas fa-file-invoice"></i> Lịch sử giao dịch
        </NavLink>
        <a
          className="dropdown-item mydropdown-item account_active_dropdown"
          href="# "
          onClick={this.logout}
        >
          <i className="fas fa-sign-out-alt"></i> Đăng xuất
        </a>
      </div>
    );
    console.log(this.state.cart);
    console.log(typeof this.state.cart);
    var numCart = this.state.cart;
    
    return (
      <div>
        {/* Banner */}
        <div style={{ backgroundColor: "#fbc1cc" }}>
          <div>
            {/* thêm class top-banner */}
            <img
              src={require("../images/ad1.webp")}
              className="top-banner mx-auto d-block"
              alt="mybookstore.online"
            />
          </div>
        </div>

        {/*Menu*/}
        <nav className="navbar navbar-expand-md navbar-line bg-white">
          <div className="container">
            <NavLink to="/" className="navbar-branch">
              <img
                src={require("../images/logo.png")}
                alt="mybookstore.online Logo"
                height="50px"
              />
            </NavLink>

            <button
              style={{ outlineColor: "#eb2b3f" }}
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="w-100">
                <form className="form-inline d-flex justify-content-center">
                  <input
                    onMouseEnter={() => {
                      this.hoverSearch(true);
                    }}
                    onMouseLeave={() => {
                      this.hoverSearch(false);
                    }}
                    onKeyDown={this._handleKeyDown}
                    type="text"
                    className={this.state.styleSearch}
                    id="search"
                    placeholder="Tìm kiếm sản phẩm mong muốn..."
                    name="search"
                    value={this.state.search}
                    onChange={this.onChange}
                  />
                  <button
                    className="btn btn-outline-danger my-2 my-sm-0 mybtn-outline ml-2"
                    onClick={this.search}
                  >
                    <i class="fas fa-search"></i>
                  </button>
                </form>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-1">
                <NavLink
                  to="/cart"
                  className="d-flex justify-content-center align-items-center flex-column ml-2 mr-4"
                >
                  <Badge badgeContent={numCart} color="error">
                    <img
                      src={require("../images/cart.png")}
                      className="img-fluid"
                      alt="cartImg"
                      width="30px"
                    />
                  </Badge>
                  <p className="headerText text-nowrap">Giỏ hàng</p>
                </NavLink>

                <div
                  className={
                    this.state.userName === "Đăng nhập" ? "" : "dropdown"
                  }
                >
                  <a
                    href="# "
                    className="d-flex justify-content-center align-items-center flex-column ml-4"
                    data-toggle={
                      this.state.userName === "Đăng nhập" ? "" : "dropdown"
                    }
                    data-target={
                      this.state.userName === "Đăng nhập" ? "" : "dropdown"
                    }
                    onClick={
                      this.state.userName === "Đăng nhập"
                        ? this.openModal
                        : null
                    }
                  >
                    <img
                      src={
                        this.state.userName === "Đăng nhập"
                          ? require("../images/user-solid-s.png")
                          : Global.isLoggedInS
                          ? Global.user[0].picture
                          : require("../images/avatar_default.png")
                      }
                      className={
                        this.state.userName === "Đăng nhập"
                          ? "img-fluid"
                          : "img-fluid rounded-circle"
                      }
                      alt="userImg"
                      width="30px"
                    />
                    <p className="headerText text-nowrap">
                      {this.state.userName}
                    </p>
                  </a>
                  {this.state.userName === "Đăng nhập" ? null : userDropdown}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Modal Đăng nhập*/}
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a
                    className={
                      this.state.chooseSignIn
                        ? "nav-link textColor title"
                        : "nav-link title"
                    }
                    id="pills-home-tab"
                    href="# "
                    role="tab"
                    onClick={() => this.toggleForm(1)}
                  >
                    Đăng nhập
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      this.state.chooseSignIn
                        ? "nav-link title"
                        : "nav-link textColor title"
                    }
                    id="pills-profile-tab"
                    href="# "
                    role="tab"
                    onClick={() => this.toggleForm(2)}
                  >
                    Tạo tài khoản
                  </a>
                </li>
              </ul>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Sign in|Sign up */}
            {this.state.chooseSignIn ? signInJSX : signUpJSX}
          </Modal.Body>
        </Modal>
        {/* End Modal Đăng nhập*/}

        {/* Modal Quên mật khẩu */}
        <Modal show={this.state.showModalForgot} onHide={this.closeModalForgot}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4 style={{ color: "#EB2B3F" }}>Quên mật khẩu?</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.errForgot === "" ? null : errForgotJSX}
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Nhập Email đã đăng ký để lấy lại mật khẩu
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailForgot"
                  name="emailForgot"
                  value={this.state.emailForgot}
                  onChange={this.onChange}
                />
              </div>
              <div className="viewmore pb-2 mt-2">
                <button
                  className="btn btn-danger mybtn"
                  onClick={this.forgotPass}
                >
                  Gửi
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {/* end modal quên mật khẩu */}
      </div>
    );
  }
}

export default withRouter(Header);
