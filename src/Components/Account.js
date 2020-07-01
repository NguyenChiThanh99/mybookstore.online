import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/account.css";
import "../CSS/mystyle.css";
import Global from "./Global";
import MetaTags from "react-meta-tags";
import axios from "axios";
import qs from "qs";
import { Modal, Button } from "react-bootstrap";

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styleInput: "col-6 d-flex align-items-center border borderColor h-25",
      likeArr: [],
      name: Global.isSignIn ? Global.user[1] : Global.user[0].name,
      phone: Global.isSignIn ? Global.user[2] : "",
      showModal: false,
    };
  }

  componentDidMount = () => {
    this.getSuggest();
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
      this.setState({
        likeArr: res.data.datalike,
      });
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

  handleShow = () => {
    this.setState({ showModal: true });
  };
  handleClose = () => {
    this.setState({ showModal: false });
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

    const bodyLikeJSX = (
      <table className="table table-striped table-borderless">
        <tbody>
          <tr>
            <td>
              <img
                src="./images/item.jpg"
                className="img-fluid"
                style={{ width: "130px" }}
                alt=""
              />
            </td>
            <td>
              Dã ngoại thật vui - Dã ngoại thật vui Dã ngoại thật vui Dã ngoại
              thật vui
            </td>
            <td className="text-nowrap">
              <span className="new-price">25.000 vnd</span>
              <span className="del-price">30.000 vnd</span>
              <div className="viewmore pb-2 mt-2">
                <button className="btn btn-danger mybtn">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="./images/item.jpg"
                className="img-fluid"
                style={{ width: "130px" }}
                alt=""
              />
            </td>
            <td>
              Dã ngoại thật vui - Dã ngoại thật vui Dã ngoại thật vui Dã ngoại
              thật vui
            </td>
            <td className="text-nowrap">
              <span className="new-price">25.000 vnd</span>
              <span className="del-price">30.000 vnd</span>
              <div className="viewmore pb-2 mt-2">
                <button className="btn btn-danger mybtn">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="./images/item.jpg"
                className="img-fluid"
                style={{ width: "130px" }}
                alt=""
              />
            </td>
            <td>
              Dã ngoại thật vui - Dã ngoại thật vui Dã ngoại thật vui Dã ngoại
              thật vui
            </td>
            <td className="text-nowrap">
              <span className="new-price">25.000 vnd</span>
              <span className="del-price">30.000 vnd</span>
              <div className="viewmore pb-2 mt-2">
                <button className="btn btn-danger mybtn">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="./images/item.jpg"
                className="img-fluid"
                style={{ width: "130px" }}
                alt=""
              />
            </td>
            <td>
              Dã ngoại thật vui - Dã ngoại thật vui Dã ngoại thật vui Dã ngoại
              thật vui
            </td>
            <td className="text-nowrap">
              <span className="new-price">25.000 vnd</span>
              <span className="del-price">30.000 vnd</span>
              <div className="viewmore pb-2 mt-2">
                <button className="btn btn-danger mybtn">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
    console.log(this.state.likeArr);
    
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
                  <div className="viewmore pb-2 mt-2">
                    <button type="submit" className="btn btn-danger mybtn">
                      Đổi mật khẩu
                    </button>
                    <button type="submit" className="btn btn-danger mybtn">
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Yêu thích */}
          <div id="yeuthich">
            <h5 className="pt-3 pl-2">YÊU THÍCH</h5>
            {this.state.likeArr.length === 0 ? emptyLikeJSX : bodyLikeJSX}
          </div>
        </div>

        <Modal show={this.state.showModal2} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận mật khẩu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Nhập mật khẩu cũ để đổi mật khẩu 
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
      </div>
    );
  }
}
