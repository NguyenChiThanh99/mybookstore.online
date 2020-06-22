import React, { Component } from "react";
import "../CSS/style.css";
import { NavLink, withRouter } from "react-router-dom";
import Global from "./Global";
import axios from "axios";
import qs from "qs";
import SocialShare from "./SocialShare";
import MetaTags from "react-meta-tags";

var timer2 = null;

export class ChiTietSanPham extends Component {
  constructor(props) {
    super(props);
    var { match } = this.props;
    this.state = {
      slug: match.params.slug,
      data: [],
      suggest: [],
      soluong: 1,
      err: "",
      noti: "",
    };
  }

  componentDidMount() {
    this.getData(this.state.slug);
  }

  componentWillUnmount() {
    clearTimeout(timer2);
  }

  closeNoti = () => {
    this.setState({ noti: "" });
  };

  closeErr = () => {
    this.setState({ err: "" });
  };

  getData = (slug) => {
    const data = {
      tenurl: slug,
    };
    const url = Global.link + "product/chitietsp";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      this.setState({
        data: res.data.data,
        suggest: res.data.datalienquan,
      });
    });
  };

  reloadPage = (newSlug) => {
    this.getData(newSlug);
    this.setState({
      soluong: 1,
      err: "",
      noti: "",
    });
  };

  getSuggest = (arrSuggest) => {
    var result = null;
    result = arrSuggest.map((product, index) => {
      return (
        <NavLink
          to={"/product/" + product.tenurl}
          key={index}
          onClick={() => this.reloadPage(product.tenurl)}
          className="product_shadow"
        >
          <li className="book d-flex flex-column mx-2">
            <img
              src={product.hinhanhsanpham}
              className="img-fluid align-self-center"
              alt={product.tensp}
              width="160px"
            />
            <div style={{ height: 75 }}>
              <p className="bookItem2 mb-2 book_item_title">{product.tensp}</p>
            </div>
            <p className="bookItem2" style={{ height: 21 }}>
              <small>{product.tacgia}</small>
            </p>
            <h6 className="bookItem2 textColor">
              <b>{this.currencyFormat(product.gia.toString())} đ</b>
            </h6>
          </li>
        </NavLink>
      );
    });
    return result;
  };

  currencyFormat = (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  tangsl = () => {
    if (this.state.soluong + 1 > 10) {
      this.setState({ err: "Vượt quá số lượng cho phép" });
      timer2 = setTimeout(() => this.setState({ err: "" }), 3000);
    } else {
      this.setState({
        soluong: this.state.soluong + 1,
      });
    }
  };

  giamsl = () => {
    if (this.state.soluong - 1 > 0) {
      this.setState({
        soluong: this.state.soluong - 1,
      });
    }
  };

  addToCart = (idsanpham) => {
    if (Global.isSignIn || Global.isLoggedInS) {
      const data = {
        email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
        idsanpham: idsanpham,
        soluongsanpham: this.state.soluong,
      };
      const url = Global.link + "cart/addcart";
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.data === "success") {
          this.setState({
            noti: "Đã thêm " + this.state.soluong + " sản phẩm vào giỏ hàng",
          });
          timer2 = setTimeout(() => this.setState({ noti: "" }), 3000);
        }
      });
    } else {
      this.setState({
        err: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng",
      });
      timer2 = setTimeout(() => this.setState({ err: "" }), 3000);
    }
  };

  render() {
    const errJSX = (
      <div className="alert alert-danger alert-dismissible fade show mt-3 mb-0">
        {this.state.err}
        <button
          onClick={this.closeErr}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
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

    if (this.state.data.length !== 0) {
      const { data } = this.state;
      var path = data[0].urlloaisp.split("/");
      return (
        <div>
          <MetaTags>
            <title>{data[0].tensp + " | mybookstore.online"}</title>
            <meta
              name="description"
              content={data[0].mota.slice(0, 250) + "..."}
            />
            <meta
              property="og:title"
              content={data[0].tensp + " | mybookstore.online"}
            />
            <meta property="og:image" content={data[0].hinhanhsanpham} />
          </MetaTags>

          {/*Path*/}
          <div className="container py-2">
            <NavLink to="/">
              <p className="path float-left">Trang chủ /{"\u00A0"}</p>
            </NavLink>
            <p className="path float-left">
              {path[0]} /{"\u00A0"}
            </p>
            <p className="path textColor">{path[1]}</p>
          </div>

          {/*Main Chi Tiet San Pham*/}
          <div className="container bg-white p-3">
            <div className="row">
              <div className="col-5">
                <div className="row">
                  <div className="col-3">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item p-1 d-flex justify-content-center border border-primary mb-2">
                        <img
                          src={data[0].hinhanhsanpham}
                          className="img-fluid"
                          alt="book_image_1"
                          width="70px"
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="col-9 d-flex p-0">
                    <img
                      src={data[0].hinhanhsanpham}
                      className="img-fluid"
                      alt="book_image_1"
                      width="350px"
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <p className="bookName">{data[0].tensp}</p>
                <img
                  src={require("../images/5stars.png")}
                  className="img-fluid"
                  alt="5stars"
                  width="80px"
                />
                <div className="row pl-3">
                  <div className="col-6">
                    <div className="row">
                      <p className="mb-0">Nhà xuất bản: &nbsp;</p>
                      <p className="textColor mb-0">{data[0].nxb}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <p className="mb-0">Tác giả: &nbsp;</p>
                      <p className="textColor mb-0">{data[0].tacgia}</p>
                    </div>
                  </div>
                </div>
                <div className="row pl-3">
                  <p>Nhà cung cấp: &nbsp;</p>
                  <p className="textColor">{data[0].nhacungcap}</p>
                </div>
                <div className="row">
                  <div className="col-6">
                    <h4 className="textColor">
                      {this.currencyFormat(data[0].gia.toString())} đ
                    </h4>
                  </div>
                  <div className="col-4">
                    <img
                      src={require("../images/heart.png")}
                      className="img-fluid align-self-center"
                      alt="heart"
                      width="30px"
                    />
                  </div>
                </div>
                <div className="row pl-3">
                  <p className="mb-0">
                    Chính sách đổi trả: Đổi trả sản phẩm trong 30 ngày &nbsp;
                  </p>
                  <p className="textColor mb-0">Xem ngay</p>
                </div>
                <SocialShare
                  shareUrl={
                    "https://mybookstore-online.herokuapp.com/product/" +
                    this.state.slug
                  }
                  title={data[0].tensp + " | mybookstore.online"}
                />
                <div
                  className="btn-group"
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={this.giamsl}
                  >
                    -
                  </button>
                  <button className="btn btn-outline-secondary px-4">
                    {this.state.soluong}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={this.tangsl}
                  >
                    +
                  </button>
                </div>
                {this.state.err === "" ? null : errJSX}
                {this.state.noti === "" ? null : notiJSX}
                <div className="row py-4 pl-3">
                  <div
                    className="btn btn-danger mybtn mb-0 pr-4"
                    onClick={() => this.addToCart(data[0]._id)}
                  >
                    Thêm vào giỏ hàng
                  </div>

                  <p className="mb-0 pl-4">
                    <div
                      className="btn btn-danger mybtn"
                      onClick={() => {
                        this.addToCart(data[0]._id);
                        this.props.history.push("/cart");
                      }}
                    >
                      Mua ngay
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*Suggest*/}
          <div className="container bg-white p-3 mt-3">
            <h5 className="p-2">
              <b>Sản phẩm liên quan</b>
            </h5>
            <ul className="d-flex justify-content-center">
              {this.getSuggest(this.state.suggest)}
            </ul>
          </div>

          {/*Thong tin chung*/}
          <div className="container bg-white p-3 mt-3">
            <h5 className="p-2">
              <b>Thông tin chung</b>
            </h5>
            <table className="ml-3">
              <tbody>
                <tr>
                  <td className="w-25 text-secondary">Nhà cung cấp</td>
                  <td className="textColor">{data[0].nhacungcap}</td>
                </tr>
                <tr>
                  <td className="w-25 text-secondary">Nhà xuất bản</td>
                  <td>{data[0].nxb}</td>
                </tr>
                <tr>
                  <td className="w-25 text-secondary">Năm xuất bản</td>
                  <td>{data[0].namxb}</td>
                </tr>
                <tr>
                  <td className="w-25 text-secondary">Tác giả</td>
                  <td className="textColor">{data[0].tacgia}</td>
                </tr>
                <tr>
                  <td className="w-25 text-secondary">Kích thước</td>
                  <td>{data[0].kichthuoc}</td>
                </tr>
                <tr>
                  <td className="w-25 text-secondary">Loại bìa</td>
                  <td>{data[0].loaibia}</td>
                </tr>
                <tr>
                  <td className="w-25 text-secondary">Số trang</td>
                  <td>{data[0].sotrang}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/*Mo ta san pham*/}
          <div className="container bg-white p-3 mt-3">
            <h5 className="p-2">
              <b>Mô tả sản phẩm</b>
            </h5>
            <p className="text-justify ml-3">{data[0].mota}</p>
          </div>

          {/*Review*/}
          <div className="container bg-white p-3 mt-3">
            <h5 className="p-2">
              <b>Khách hàng nhận xét</b>
            </h5>
            <ul className="mt-4">
              <li className="mb-3">
                <div className="row">
                  <div className="col-2 d-flex justify-content-center align-items-center flex-column">
                    <img
                      src={require("../images/avatar.jpg")}
                      className="img-fluid rounded-circle"
                      alt="avatar"
                      width="80px"
                    />
                    <h6 className="mt-2">Chí Thanh</h6>
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-1 pr-0">
                        <img
                          src={require("../images/5stars.png")}
                          className="img-fluid"
                          alt="5stars"
                          width="80px"
                        />
                      </div>
                      <div className="col-10">
                        <p className="mb-0">Rất hài lòng</p>
                      </div>
                    </div>
                    <p className="mb-1 textColor">
                      Đã mua sản phẩm này tại mybookstore.online
                    </p>
                    <p>
                      Mua sách của mybookstore nhiều và hiện tại vẫn rất hài
                      lòng. Sách mới, bọc nilon, không bị bẩn, cong gấp mép hoặc
                      trầy xước. Chất liệu giấy khá tuyệt. Tiếc là không có
                      bookmark
                    </p>
                  </div>
                </div>
              </li>
              <li className="mb-3">
                <div className="row">
                  <div className="col-2 d-flex justify-content-center align-items-center flex-column">
                    <img
                      src={require("../images/avatar.jpg")}
                      className="img-fluid rounded-circle"
                      alt="avatar"
                      width="80px"
                    />
                    <h6 className="mt-2">Chí Thanh</h6>
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-1 pr-0">
                        <img
                          src={require("../images/5stars.png")}
                          className="img-fluid"
                          alt="5stars"
                          width="80px"
                        />
                      </div>
                      <div className="col-10">
                        <p className="mb-0">Rất hài lòng</p>
                      </div>
                    </div>
                    <p className="mb-1 textColor">
                      Đã mua sản phẩm này tại mybookstore.online
                    </p>
                    <p>
                      Mua sách của mybookstore nhiều và hiện tại vẫn rất hài
                      lòng. Sách mới, bọc nilon, không bị bẩn, cong gấp mép hoặc
                      trầy xước. Chất liệu giấy khá tuyệt. Tiếc là không có
                      bookmark
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(ChiTietSanPham);