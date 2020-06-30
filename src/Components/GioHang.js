import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import Global from "./Global";
import MetaTags from "react-meta-tags";

import "../CSS/giohang.css";
import ItemCart from "./ItemCart";

export default class GioHang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      suggest: [],
      showModal: false,
      showModal2: false,
      item: null,
      total: 0,
      stylePay: "btn btn-danger mybtn ml-4 btn-viewmore-cart",
      loading: false,
      emptyCart: false,
    };
  }

  componentDidMount() {
    if (Global.isSignIn || Global.isLoggedInS) {
      this.getCart();
    }
  }

  getCart = () => {
    const data = {
      email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
    };
    const url = Global.link + "cart/showcart";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      this.setState({
        cart: res.data.data,
      });
      if (res.data.data.length !== 0) {
         this.calTotal();
      } else {
        this.setState({
          loading: false,
          emptyCart: true,
        })
      }
    });
  };

  show_cart = () => {
    var result = null;
    if (this.state.cart.length > 0) {
      result = this.state.cart.map((item, index) => {
        return (
          <ItemCart
            key={index}
            item={item}
            getItem={this.getItem}
            getSoLuong={this.getSoLuong}
          />
        );
      });
    }
    return result;
  };

  getSoLuong = (item) => {
    const data = {
      email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
      idsanpham: item.id,
      soluongsanpham: item.soluong,
    };
    const url = Global.link + "cart/updatecart";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.data === "success") {
        var newCart = this.state.cart;
        for (var i = 0; i < newCart.length; i++) {
          if (newCart[i].idsanpham === item.id) {
            newCart[i].soluongsanpham = item.soluong;
          }
        }
        var total = this.state.total;
        if (item.action) {
          total = total + item.gia;
        } else {
          total = total - item.gia;
        }
        this.setState({ cart: newCart, total: total });
      }
    });
  };

  calTotal() {
    var t = 0;
    for (var i = 0; i < this.state.cart.length; i++) {
      t += this.state.cart[i].soluongsanpham * this.state.cart[i].gia;
    }
    this.setState({ total: t });
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleShow = () => {
    this.setState({ showModal: true });
  };
  handleClose2 = () => {
    this.setState({ showModal2: false });
  };
  handleShow2 = () => {
    this.setState({ showModal2: true });
  };

  deleteOneItem = () => {
    this.handleClose();
    const data = {
      email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
      idsanpham: this.state.item.idsanpham,
    };
    const url = Global.link + "cart/deleteonecart";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.data === "success") {
        this.setState({ cart: [] });
        this.getCart();
      }
    });
  };

  deleteAllItem = () => {
    this.handleClose2();
    const data = {
      email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
    };
    const url = Global.link + "cart/deleteallcart";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.data === "success") {
        this.setState({ cart: [], total: 0 });
      }
    });
  };

  getItem = (item) => {
    this.setState({ item: item });
    this.handleShow();
  };

  currencyFormat = (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  render() {
    var firstItemImg = "https://uit-hotelbooking.000webhostapp.com/logo.png";
    if (this.state.cart.length !== 0) {
      firstItemImg = this.state.cart[0].hinhanhsanpham;
    }

    const loadingJSX = (
      <div className="container bg-white p-3 mt-3 d-flex justify-content-center">
        <img
          src={require("../images/loading.gif")}
          className="img-fluid align-self-center"
          alt="loading"
          width="250px"
        />
      </div>
    );

    const emptyCartJSX = (
      <div className="container bg-white p-3 mt-3 text-center">
        <img
          src={require("../images/empty-cart.png")}
          className="img-fluid align-self-center"
          alt="empty-cart"
          width="300px"
        />
        <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
        <NavLink to="/" className="btn btn-danger mybtn mr-3 btn-viewmore-cart">
          Tiếp tục mua sắm
        </NavLink>
      </div>
    );

    if (this.state.cart.length !== 0) {
      return (
        <div>
          <MetaTags>
            <title>Giỏ hàng | mybookstore.online</title>
            <meta property="og:url" content="https://mybookstore.online/cart" />
            <meta property="og:type" content="website" />
            <meta
              name="description"
              content="Thỏa sức mua sắm qua mạng với hàng ngàn mặt hàng sách tại mybookstore.online với giá rẻ hơn và nhiều ưu đãi hấp dẫn."
            />
            <meta property="og:title" content="Giỏ hàng | mybookstore.online" />
            <meta property="og:image" content={firstItemImg} />
          </MetaTags>

          {/*Path*/}
          <div className="container py-2 px-0">
            <NavLink to="/">
              <p className="path float-left">Trang chủ /{"\u00A0"}</p>
            </NavLink>
            <p className="path textColor">Giỏ hàng</p>
          </div>
          {/*Cart*/}
          {/*Cart*/}
          <div className="container bg-white p-3">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th style={{ whiteSpace: "nowrap" }}>Hình ảnh</th>
                  <th style={{ whiteSpace: "nowrap" }}>Đơn giá</th>
                  <th style={{ whiteSpace: "nowrap" }}>Số lượng</th>
                  <th style={{ whiteSpace: "nowrap" }}>Thành tiền</th>
                  <th />
                </tr>
              </thead>
              <tbody>{this.show_cart()}</tbody>
            </table>
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-start">
                <NavLink
                  to="/"
                  className="btn btn-danger mybtn mr-3 btn-viewmore-cart"
                >
                  Tiếp tục mua sắm
                </NavLink>
                <button
                  type="button"
                  className="btn btn-danger mybtn"
                  onClick={this.handleShow2}
                >
                  Xóa hết giỏ hàng
                </button>
              </div>
              <div className="d-flex justify-content-end">
                <div className="row">
                  <p className="ml-3">Tổng cộng: </p>
                  <p className="ml-3" style={{ color: "#EB2B3F" }}>
                    {" "}
                    <b>{this.currencyFormat(this.state.total.toString())} đ</b>
                  </p>
                </div>

                <NavLink
                  to="/pay"
                  type="button"
                  className={
                    this.state.cart.length === 0
                      ? "btn btn-secondary mybtn ml-4 btn-viewmore-cart disabled"
                      : "btn btn-danger mybtn ml-4 btn-viewmore-cart"
                  }
                >
                  Thanh toán
                </NavLink>
              </div>
            </div>
          </div>

          {/*Suggest*/}
          <div className="container bg-white p-3 mt-3">
            <ul className="d-flex justify-content-center">
              <li className="book d-flex flex-column mx-2">
                <NavLink to="/chitietsanpham" className="product_shadow">
                  <img
                    src={require("../images/book5.gif")}
                    className="img-fluid align-self-center"
                    alt="book1"
                    width="120px"
                  />
                  <p className="bookItem2 mb-2">
                    Tôi thấy hoa vàng trên cỏ xanh
                  </p>
                  <p className="bookItem2" style={{ height: 21 }}>
                    <small>Nguyễn Nhật Ánh</small>
                  </p>
                  <h6 className="bookItem textColor">
                    <b>83.090 đ</b>
                  </h6>
                </NavLink>
              </li>
            </ul>
          </div>

          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bạn có chắc muốn xóa cuốn{" "}
              <b>{this.state.item === null ? "" : this.state.item.tensp}</b>{" "}
              khỏi giỏ hàng?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Đóng
              </Button>
              <Button variant="danger" onClick={this.deleteOneItem}>
                Xóa
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showModal2} onHide={this.handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Xác nhận xóa giỏ hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bạn có chắc muốn xóa toàn bộ sản phẩm khỏi giỏ hàng?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose2}>
                Đóng
              </Button>
              <Button variant="primary" onClick={this.deleteAllItem}>
                Xóa
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else {
      this.setState({
        loading: true,
      });
      return (
        this.state.loading ? loadingJSX : null,
        this.state.emptyCart ? emptyCartJSX : null
      );
    }
  }
}
