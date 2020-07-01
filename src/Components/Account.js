import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/account.css";
import "../CSS/mystyle.css";
import Global from "./Global";
import MetaTags from "react-meta-tags";
import axios from "axios";
import qs from "qs";
import { Modal } from "react-bootstrap";

var timer4 = null;

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styleInput: "col-6 d-flex align-items-center border borderColor h-25",
      likeArr: [],
      name: Global.isSignIn ? Global.user[1] : Global.user[0].name,
      phone: Global.isSignIn ? Global.user[2] : "",
      showModal1: false,
      showModal2: false,
      loading: true,
      empty: false,
      password: "",
      noti: "",
    };
  }

  componentDidMount = () => {
    this.getSuggest();
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
    this.setState({ showModal1: false });
  };
  handleShow2 = () => {
    this.setState({ showModal2: true });
  };
  handleClose2 = () => {
    this.setState({ showModal2: false });
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
          <div className="d-flex justify-content-center row px-2" key={index}>
            {this.show_6_like_prod(likeArr.slice(start, start + 6))}
          </div>
        );
      });
      return result;
    }
  };

  changeProfile = (event) => {
    event.preventDefault();
    const data = {
      email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
      name: this.state.name,
      phone: this.state.phone,
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
      } else {
        this.setState({
          noti: "Đã xảy ra lỗi, vui lòng thử lại",
        });
        timer4 = setTimeout(() => this.setState({ noti: "" }), 4000);
      }
    });
  };

  render() {
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
      <div className="alert alert-success alert-dismissible fade show mt-3 mb-0">
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
                    <label htmlFor="name" className="col-sm-2 col-form-label">
                      Tên
                    </label>
                    <div className="col-sm-10">
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
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-10">
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
                    <label htmlFor="phone" className="col-sm-2 col-form-label">
                      Số điện thoại
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  {this.state.noti === "" ? null : notiJSX}
                  <div className="viewmore pb-2 mt-2">
                    <button
                      className="btn btn-danger mybtn mr-4"
                      onClick={this.handleShow1}
                    >
                      Đổi mật khẩu
                    </button>
                    <button
                      className="btn btn-danger mybtn ml-4"
                      onClick={this.changeProfile}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
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
      </div>
    );
  }
}
