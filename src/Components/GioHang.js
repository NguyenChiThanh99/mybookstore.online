import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import Global from "./Global";
import MetaTags from "react-meta-tags";
import LazyLoad from "react-lazyload";

import "../CSS/giohang.css";
import ItemCart from "./ItemCart";
import Header from "./Header";
import Footer from "./Footer";

export class GioHang extends Component {
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
      loading: true,
      emptyCart: false,
    };
  }

  componentDidMount() {
    if (Global.isSignIn || Global.isLoggedInS) {
      this.getCart();
    } else {
      this.setState({
        loading: false,
        emptyCart: true,
      });
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
        loading: false,
      });
      if (res.data.data.length !== 0) {
        this.calTotal();
        this.getSuggest(res.data.data[0].slug);
      } else {
        this.setState({
          loading: false,
          emptyCart: true,
        });
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
        this.setState({ cart: [], loading: true });
        this.getCart();
        var cart = 0;
        if ((localStorage !== null && localStorage.getItem("cart")) !== null) {
          cart = JSON.parse(localStorage.getItem("cart"));
        }
        localStorage.setItem("cart", JSON.stringify(cart - 1));
        Global.cart();
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
        this.setState({ cart: [], total: 0, emptyCart: true });
        localStorage.setItem("cart", JSON.stringify(0));
        Global.cart();
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

  getSuggest = (slug) => {
    const data = {
      tenurl: slug,
    };
    const url = Global.link + "cart/sanphamlienquan";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      this.setState({
        suggest: res.data.datalienquan,
      });
    });
  };

  showSuggest = () => {
    var result = null;
    if (this.state.suggest.length > 0) {
      result = this.state.suggest.map((product, index) => {
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
    }
    return result;
  };

  getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  render() {
    var firstItemImg = "https://uit-hotelbooking.000webhostapp.com/logo.png";
    if (this.state.cart.length !== 0) {
      firstItemImg = this.state.cart[0].hinhanhsanpham;
    }

    const loadingJSX = (
      <div className="container bg-white p-3 d-flex justify-content-center">
        <img
          src={require("../images/loading.gif")}
          className="img-fluid align-self-center"
          alt="loading"
          width="200px"
        />
      </div>
    );

    const emptyCartJSX = (
      <div className="container bg-white p-3 text-center">
        <img
          src={require("../images/empty-cart.png")}
          className="img-fluid align-self-center"
          alt="empty-cart"
          width="300px"
        />
        <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
        <button
          className="btn btn-danger mybtn btn-viewmore-cart"
          onClick={() => {
            this.props.history.push("/");
          }}
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );

    const bodyJSX = (
      <div>
        <div className="container bg-white p-3">
          {/* tiêu đề */}
          <div className="an-thongtin">
            <div className="row pb-2">
              <div className="col-sm-1">
                <h6 style={{ fontWeight: "bold" }}>Tên sách</h6>
              </div>
              <div className="col-sm-10 px-0">
                <div className="row">
                  <div className="col-sm-9"></div>
                  <div className="col-sm-3">
                    <div className="row">
                      <div className="col-sm-6 col-6 gia-sanpham">
                        <h6 style={{ fontWeight: "bold" }}>Đơn giá</h6>
                      </div>
                      <div className="col-sm-6 col-6">
                        <h6 style={{ fontWeight: "bold" }}>Số lượng</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-1"></div>
            </div>
            <hr className="mt-0" />
          </div>

          {/* nội dung */}
          {this.show_cart()}

          {/* buttons */}
          <div className="row pb-3">
            <div className="col-sm-4 pt-2">
              <div className="row">
                <div className="col-5 pr-0">
                  <button
                    onClick={() => {
                      this.props.history.push("/");
                    }}
                    type="button"
                    className="btn btn-outline-danger mybtn-outline text-nowrap"
                    style={{ width: "inherit" }}
                  >
                    Xem thêm
                  </button>
                </div>
                <div className="col-7">
                  <button
                    type="button"
                    className="btn btn-outline-danger mybtn-outline text-nowrap"
                    style={{ width: "inherit" }}
                    onClick={this.handleShow2}
                  >
                    Xóa hết giỏ hàng
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-4 pt-2" />
            <div className="col-sm-2 align-self-center pt-2">
              <div className="row">
                <div className="col-6">
                  <p className="mb-0 text-nowrap">Tổng cộng: </p>
                </div>
                <div className="col-6">
                  <p
                    className="mb-0 text-right text-nowrap"
                    style={{ color: "#EB2B3F" }}
                  >
                    {" "}
                    <b>{this.currencyFormat(this.state.total.toString())} đ</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-2 pt-2">
              <NavLink
                to="/pay"
                type="button"
                className="btn btn-danger mybtn"
                style={{ width: "inherit" }}
              >
                Thanh toán
              </NavLink>
            </div>
          </div>
        </div>

        {/*Suggest*/}
        {this.state.suggest.length === 0 ? null : (
          <div className="container bg-white p-3 mt-3">
            <h5 className="p-2">
              <b>Sản phẩm liên quan</b>
            </h5>
            <div className="d-flex justify-content-center row px-2">
              {this.showSuggest(this.state.suggest)}
            </div>
          </div>
        )}

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc muốn xóa cuốn{" "}
            <b>{this.state.item === null ? "" : this.state.item.tensp}</b> khỏi
            giỏ hàng?
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
            <Button variant="danger" onClick={this.deleteAllItem}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );

    return (
      <div>
        <Header />

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
        <div className="container py-2 px-2">
          <NavLink to="/">
            <p className="path float-left">Trang chủ /{"\u00A0"}</p>
          </NavLink>
          <p className="path textColor">Giỏ hàng</p>
        </div>
        {this.state.loading ? loadingJSX : null}
        {this.state.emptyCart ? emptyCartJSX : null}
        {this.state.cart.length !== 0 ? bodyJSX : null}

        <LazyLoad>
          <Footer />
        </LazyLoad>
      </div>
    );
  }
}

export default withRouter(GioHang);
