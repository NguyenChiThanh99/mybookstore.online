import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import '../CSS/account.css';
import "../CSS/mystyle.css";
import Global from "./Global";
import MetaTags from "react-meta-tags";

export default class Account extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      styleInput: "col-6 d-flex align-items-center border borderColor h-25",
    };
    console.log(Global.user);
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
  
  render() {
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
        <div className="container py-2 px-0">
          <NavLink to="/">
            <p className="path float-left">Trang chủ /{"\u00A0"}</p>
          </NavLink>
          <p className="path textColor">Thông tin tài khoản</p>
        </div>

        <div className="container" style={{ backgroundColor: "white" }}>
          {/* Thông tin tài khoản */}
          <div id="thongtintaikhoan">
            <h5 className="pt-3 pl-2">THÔNG TIN TÀI KHOẢN</h5>
            <div className="row">
              <div className="col-md-3">
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
                        defaultValue={
                          Global.isSignIn ? Global.user[1] : Global.user[0].name
                        }
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
                    <label
                      htmlFor="password"
                      className="col-sm-2 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        defaultValue={1234567}
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
                        defaultValue={Global.isSignIn ? Global.user[2] : ""}
                      />
                    </div>
                  </div>
                  <div className="viewmore pb-2 mt-2">
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
            {/* Chưa có yêu thích */}
            <div className="pl-5 pb-3">
              <p style={{ display: "inline" }}>Chưa có sản phẩm yêu thích. </p>
              <NavLink to="/" className="textColor">
                <b>Về trang chủ</b>
              </NavLink>
            </div>
            {/* Đã có yêu thích */}
            {/* <table class="table table-striped table-borderless">
                <tbody>
                    <tr>
                        <td><img src="./images/item.jpg" class="img-fluid" style="width:130px" alt=""></td>
                        <td>Dã ngoại thật vui - Dã ngoại thật vui Dã ngoại thật vui Dã ngoại thật vui</td>
                        <td class="text-nowrap">
                            <span class="new-price">25.000 vnd</span>
                            <span class="del-price">30.000 vnd</span>
                            <div class="viewmore pb-2 mt-2">
                                <button class="btn btn-danger mybtn">Thêm vào giỏ hàng</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="./images/item.jpg" class="img-fluid" style="width:130px" alt=""></td>
                        <td>Dã ngoại thật vui - Dã ngoại thật vui Dã ngoại thật vui Dã ngoại thật vui</td>
                        <td class="text-nowrap">
                            <span class="new-price">25.000 vnd</span>
                            <span class="del-price">30.000 vnd</span>
                            <div class="viewmore pb-2 mt-2">
                                <button class="btn btn-danger mybtn">Thêm vào giỏ hàng</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="./images/item.jpg" class="img-fluid" style="width:130px" alt=""></td>
                        <td>Dã ngoại thật vui - Dã ngoại thật vui Dã ngoại thật vui Dã ngoại thật vui</td>
                        <td class="text-nowrap">
                            <span class="new-price">25.000 vnd</span>
                            <span class="del-price">30.000 vnd</span>
                            <div class="viewmore pb-2 mt-2">
                                <button class="btn btn-danger mybtn">Thêm vào giỏ hàng</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="./images/item.jpg" class="img-fluid" style="width:130px" alt=""></td>
                        <td>Dã ngoại thật vui - Dã ngoại thật vui Dã ngoại thật vui Dã ngoại thật vui</td>
                        <td class="text-nowrap">
                            <span class="new-price">25.000 vnd</span>
                            <span class="del-price">30.000 vnd</span>
                            <div class="viewmore pb-2 mt-2">
                                <button class="btn btn-danger mybtn">Thêm vào giỏ hàng</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table> */}
            {/* end đã có yêu thích */}
          </div>
        </div>
      </div>
    );
  }
}
