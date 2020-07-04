import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Global from "./Global";
import axios from "axios";
import qs from "qs";
import SocialShare from "./SocialShare";
import MetaTags from "react-meta-tags";

import "../CSS/style.css";

var timer2 = null;

export class ChiTietSanPham extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    var { match } = this.props;
    this.state = {
      slug: match.params.slug,
      idBill: match.params.idbill,
      isComment: match.params.iscomment,
      data: {
        gia: "0",
        hinhanhsanpham: "https://uit-hotelbooking.000webhostapp.com/logo.png",
        kichthuoc: "",
        loaibia: "",
        mota: "",
        namxb: "",
        nhacungcap: "",
        nxb: "",
        sotrang: 0,
        tacgia: "",
        tensp: "",
        urlloaisp: "_/_",
      },
      dataComment: [],
      page: 0,
      btnViewmore: true,
      dataRate: [],
      lengthComment: 0,
      suggest: [],
      soluong: 1,
      err: "",
      noti: "",
      rating: 0,
      review: "",
      errCmt: "",
      cmtSuccess: "",
      percentRating: [0, 0, 0, 0, 0],
      AVGRating: 0,
      like: false,
    };
  }

  componentDidMount() {
    this.getData(this.state.slug);
  }

  componentWillUnmount() {
    clearTimeout(timer2);
  }

  scrollToMyRef = () => {
    this.myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  closeNoti = () => {
    this.setState({ noti: "" });
  };

  closeErr = () => {
    this.setState({ err: "" });
  };

  getData = (slug) => {
    var email = null;
    if (Global.isSignIn || Global.isLoggedInS) {
      email = Global.isSignIn ? Global.user[0] : Global.user[0].email;
    }
    const data = {
      tenurl: slug,
      email: email,
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
        dataRate: res.data.datarate,
        like: res.data.islike,
      });
      if (this.state.isComment !== undefined) {
        this.scrollToMyRef();
      }
      this.calRating(res.data.datarate);
      this.getDataComment(slug);
    });
  };

  getDataComment = (slug) => {
    const data = {
      tenurl: slug,
      page: this.state.page,
    };
    const url = Global.link + "product/showcomment";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.datacomment.length !== 0) {
        this.setState({
          dataComment: this.state.dataComment.concat(res.data.datacomment),
          page: this.state.page + 1,
        });
      } else {
        this.setState({
          btnViewmore: false,
        });
      }
    });
  };

  reloadPage = (newSlug) => {
    this.getData(newSlug);
    this.setState({
      slug: newSlug,
      soluong: 1,
      err: "",
      noti: "",
      idBill: "",
      isComment: undefined,
      rating: 0,
      review: "",
      percentRating: [0, 0, 0, 0, 0],
      AVGRating: 0,
      dataComment: [],
      page: 0,
      lengthComment: 0,
    });
  };

  getSuggest = (arrSuggest) => {
    var result = null;
    result = arrSuggest.map((product, index) => {
      var discount = this.getRandom(5, 15);
      var newPrice = product.gia + (product.gia * discount) / 100;
      newPrice = Math.round(newPrice / 1000) * 1000;
      return (
        <div
          className="col-lg-2 col-md-3 col-sm-4 col-6 product_shadow my-2"
          key={index}
          onClick={() => this.reloadPage(product.tenurl)}
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

  showComment = (dataComment) => {
    var result = null;
    if (dataComment.length !== 0) {
      result = dataComment.map((cmt, index) => {
        var starImg = require("../images/1star.png");
        var starTitle = "Rất tệ";
        if (cmt.rate === 2) {
          starImg = require("../images/2stars.png");
          starTitle = "Tệ";
        } else if (cmt.rate === 3) {
          starImg = require("../images/3stars.png");
          starTitle = "Bình thường";
        } else if (cmt.rate === 4) {
          starImg = require("../images/4stars.png");
          starTitle = "Tuyệt vời";
        } else if (cmt.rate === 5) {
          starImg = require("../images/5stars.png");
          starTitle = "Rất tuyệt vời";
        }
        return (
          <div className="row" key={index}>
            <div className="col-sm-2 col-4 pr-0 text-center">
              <img
                src={
                  Global.isSignIn
                    ? require("../images/avatar_default.png")
                    : cmt.picture
                }
                className="img-fluid rounded-circle"
                alt="avatar"
                width="70px"
              />
              <p className="mt-2">{cmt.name}</p>
            </div>
            <div className="col-sm-10 col-8">
              <div className="row">
                <div className="col-sm-1 col-4 pr-0">
                  <img src={starImg} className="img-fluid" alt="stars" />
                </div>
                <div className="col-sm-10 col-8">
                  <p className="mb-0">{starTitle}</p>
                </div>
              </div>
              <p className="mb-1 textColor">
                Đã mua sản phẩm này tại mybookstore.online
              </p>
              <p>{cmt.nhanxet}</p>
            </div>
          </div>
        );
      });
    }
    return result;
  };

  calRating = (dataRate) => {
    var length =
      dataRate[0] + dataRate[1] + dataRate[2] + dataRate[3] + dataRate[4];
    this.setState({ lengthComment: length });
    if (dataRate.length !== 0 && length !== 0) {
      this.setState({
        percentRating: [
          Math.round((dataRate[0] / length) * 1000) / 10,
          Math.round((dataRate[1] / length) * 1000) / 10,
          Math.round((dataRate[2] / length) * 1000) / 10,
          Math.round((dataRate[3] / length) * 1000) / 10,
          Math.round((dataRate[4] / length) * 1000) / 10,
        ],
        AVGRating:
          Math.round(
            ((dataRate[0] * 1 +
              dataRate[1] * 2 +
              dataRate[2] * 3 +
              dataRate[3] * 4 +
              dataRate[4] * 5) /
              length) *
              10
          ) / 10,
      });
    }
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
        this.setState({
          noti: "Đã thêm " + this.state.soluong + " sản phẩm vào giỏ hàng",
        });
        timer2 = setTimeout(() => this.setState({ noti: "" }), 4000);
        if (res.data.data === "addcartsuccess") {
          var cart = 0;
          if (
            (localStorage !== null && localStorage.getItem("cart")) !== null
          ) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }
          localStorage.setItem("cart", JSON.stringify(cart + 1));
          Global.cart();
        }
      });
      return true;
    } else {
      this.setState({
        err: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng",
      });
      timer2 = setTimeout(() => this.setState({ err: "" }), 4000);
      return false;
    }
  };

  goToCategory = (type) => {
    this.props.history.push("/category/" + type);
  };

  onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value,
    });
  };

  postComment = (event) => {
    event.preventDefault();
    const { slug, rating, review, idBill } = this.state;
    if (rating === 0) {
      this.setState({
        errCmt: "Lỗi! Vui lòng đánh giá số sao cho sản phẩm",
      });
      timer2 = setTimeout(() => this.setState({ errCmt: "" }), 4000);
    } else if (review === "") {
      this.setState({
        errCmt: "Lỗi! Vui lòng nhập nhận xét của bạn cho sản phẩm",
      });
      timer2 = setTimeout(() => this.setState({ errCmt: "" }), 4000);
    } else {
      const data = {
        tenurl: slug,
        email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
        rate: rating,
        nhanxet: review,
        madonhang: idBill,
      };
      const url = Global.link + "comment/comment";
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url,
        data: qs.stringify(data),
      };
      axios(options).then((res) => {
        if (res.data.data === "success") {
          var dataCmt = this.state.dataComment;
          var newObj = {
            name: Global.isSignIn ? Global.user[1] : Global.user[0].name,
            nhanxet: review,
            picture: Global.isSignIn
              ? require("../images/avatar_default.png")
              : Global.user[0].picture,
            rate: parseInt(rating),
          };
          dataCmt = dataCmt.concat(newObj);

          var newRate = this.state.dataRate;
          if (parseInt(rating) === 1) {
            newRate = [
              newRate[0] + 1,
              newRate[1],
              newRate[2],
              newRate[3],
              newRate[4],
            ];
          } else if (parseInt(rating) === 2) {
            newRate = [
              newRate[0],
              newRate[1] + 1,
              newRate[2],
              newRate[3],
              newRate[4],
            ];
          } else if (parseInt(rating) === 3) {
            newRate = [
              newRate[0],
              newRate[1],
              newRate[2] + 1,
              newRate[3],
              newRate[4],
            ];
          } else if (parseInt(rating) === 4) {
            newRate = [
              newRate[0],
              newRate[1],
              newRate[2],
              newRate[3] + 1,
              newRate[4],
            ];
          } else if (parseInt(rating) === 5) {
            newRate = [
              newRate[0],
              newRate[1],
              newRate[2],
              newRate[3],
              newRate[4] + 1,
            ];
          }
          this.calRating(newRate, dataCmt);
          this.setState({
            rating: 0,
            comment: "",
            isComment: undefined,
            cmtSuccess: "Nhận xét sản phẩm thành công",
            dataComment: dataCmt,
          });
          timer2 = setTimeout(() => this.setState({ cmtSuccess: "" }), 4000);
        }
      });
    }
  };

  like = () => {
    const data = {
      tenurl: this.state.slug,
      email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
    };
    const url = Global.link + "product/productlike";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.data === "success") {
        this.setState({
          like: true,
        });
      } else {
        this.setState({
          like: false,
        });
      }
    });
  };

  getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  render() {
    const viewMoreJSX = (
      <div className="viewmore pb-2 mt-2">
        <button
          className="btn btn-danger mybtn"
          onClick={() => this.getDataComment(this.state.slug)}
        >
          Xem thêm
        </button>
      </div>
    );

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

    const errCommentJSX = (
      <div className="alert alert-danger alert-dismissible fade show mt-3 mb-0">
        {this.state.errCmt}
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

    const commentSuccessJSX = (
      <div className="alert alert-success alert-dismissible fade show mt-3 mb-0">
        {this.state.cmtSuccess}
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

    /*const commentBtn = (
      <div className="col-sm-4">
        <h6 className="text-center">Chia sẻ nhận xét về sản phẩm</h6>
        <div className="viewmore pb-2 mt-2">
          <button className="btn btn-outline-danger mybtn-outline">
            Viết nhận xét của bạn
          </button>
        </div>
      </div>
    );*/

    var image = "https://uit-hotelbooking.000webhostapp.com/logo.png";
    var name = "";
    if (this.state.data.length !== 0) {
      image = this.state.data.hinhanhsanpham;
      name = this.state.data.tensp;
    }
    const comment = (
      <div
        className="row py-3"
        style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }}
      >
        <div
          className="col-sm-6"
          style={{ borderRight: "1px solid rgba(0,0,0,.1)" }}
        >
          <div className="row">
            <div className="col-4">
              <img
                src={image}
                className="img-fluid"
                style={{ width: "150px" }}
                alt={name}
              />
            </div>
            <div className="col-8 pl-0">
              <p className="mb-2">{name}</p>
              <p style={{ display: "inline" }}>
                <i className="fas fa-star" style={{ color: "#eb2b3f" }} />
                <i className="fas fa-star" style={{ color: "#eb2b3f" }} />
                <i className="fas fa-star" style={{ color: "#eb2b3f" }} />
                <i className="fas fa-star" style={{ color: "#eb2b3f" }} />
                <i className="fas fa-star" style={{ color: "#eb2b3f" }} />
              </p>
              <p>({this.state.lengthComment} đánh giá)</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <h5>Gửi nhận xét của bạn</h5>
          <form>
            <div className="row form-group mb-0">
              <div className="col-sm-4 col-6 align-self-center">
                <p className="mb-0 text-nowrap">1. Đánh giá sản phẩm:</p>
              </div>
              <div className="col-sm-8 col-6 align-self-center">
                <div className="rating">
                  <input
                    type="radio"
                    id="star5"
                    onChange={this.onChange}
                    name="rating"
                    defaultValue={5}
                  />
                  <label className="mb-0" htmlFor="star5" title="Rất tuyệt vời">
                    5 stars
                  </label>
                  <input
                    type="radio"
                    id="star4"
                    name="rating"
                    onChange={this.onChange}
                    defaultValue={4}
                  />
                  <label className="mb-0" htmlFor="star4" title="Tuyệt vời">
                    4 stars
                  </label>
                  <input
                    type="radio"
                    id="star3"
                    name="rating"
                    onChange={this.onChange}
                    defaultValue={3}
                  />
                  <label className="mb-0" htmlFor="star3" title="Bình thường">
                    3 stars
                  </label>
                  <input
                    type="radio"
                    id="star2"
                    name="rating"
                    onChange={this.onChange}
                    defaultValue={2}
                  />
                  <label className="mb-0" htmlFor="star2" title="Tệ">
                    2 stars
                  </label>
                  <input
                    type="radio"
                    id="star1"
                    name="rating"
                    onChange={this.onChange}
                    defaultValue={1}
                  />
                  <label className="mb-0" htmlFor="star1" title="Rất tệ">
                    1 star
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <p>2. Nhận xét của bạn:</p>
              <input
                type="text"
                className="form-control"
                placeholder="Nhận xét của bạn về sản phẩm"
                id="review"
                name="review"
                value={this.state.review}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <a
                href="# "
                className="btn btn-danger mybtn"
                onClick={(event) => {
                  this.postComment(event);
                }}
              >
                Gửi nhận xét
              </a>
            </div>
          </form>
        </div>
      </div>
    );
    const { data } = this.state;
    var path = data.urlloaisp.split("/");

    var AVGRating = Math.round(this.state.AVGRating);
    var starImage = require("../images/1star.png");
    if (AVGRating === 2) {
      starImage = require("../images/2stars.png");
    } else if (AVGRating === 3) {
      starImage = require("../images/3stars.png");
    } else if (AVGRating === 4) {
      starImage = require("../images/4stars.png");
    } else if (AVGRating === 5) {
      starImage = require("../images/5stars.png");
    }

    return (
      <div>
        <MetaTags>
          <title>{data.tensp + " | mybookstore.online"}</title>
          <meta
            property="og:url"
            content={"https://mybookstore.online/product/" + this.state.slug}
          />
          <meta property="og:type" content="website" />
          <meta name="description" content={data.mota.slice(0, 250) + "..."} />
          <meta
            property="og:title"
            content={data.tensp + " | mybookstore.online"}
          />
          <meta property="og:image" content={data.hinhanhsanpham} />
        </MetaTags>

        {/*Path*/}
        <div className="container py-2 mb-1 px-2">
          <NavLink to="/">
            <p className="path float-left">Trang chủ /{"\u00A0"}</p>
          </NavLink>
          <a href="# ">
            <p
              className="path float-left"
              onClick={(e) => {
                this.goToCategory(path[0]);
              }}
            >
              {path[0]} /{"\u00A0"}
            </p>
          </a>
          <a href="# ">
            <p
              className="path textColor"
              onClick={(e) => {
                this.goToCategory(path[0] + "|" + path[1]);
              }}
            >
              {path[1]}
            </p>
          </a>
        </div>

        {/*Main Chi Tiet San Pham*/}
        <div className="container bg-white px-3 pb-3">
          <div className="row">
            <div className="col-sm-5 pt-3">
              <div className="row">
                <div className="col-3">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item p-1 d-flex justify-content-center border border-primary mb-2">
                      <img
                        src={data.hinhanhsanpham}
                        className="img-fluid"
                        alt="book_image_1"
                        width="70px"
                      />
                    </li>
                  </ul>
                </div>
                <div className="col-9 d-flex p-0">
                  <img
                    src={data.hinhanhsanpham}
                    className="img-fluid"
                    alt="book_image_1"
                    width="350px"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6 pt-3">
              <p className="bookName">{data.tensp}</p>
              {this.state.AVGRating === 0 ? null : (
                <img
                  src={starImage}
                  className="img-fluid"
                  alt="stars"
                  width="80px"
                />
              )}
              <div className="row pl-3">
                <div className="col-sm-6">
                  <div className="row">
                    <p className="mb-0">Nhà xuất bản: &nbsp;</p>
                    <p className="textColor mb-0">{data.nxb}</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="row">
                    <p className="mb-0">Tác giả: &nbsp;</p>
                    <p className="textColor mb-0">{data.tacgia}</p>
                  </div>
                </div>
              </div>
              <div className="row pl-3">
                <p className="text-nowrap">Nhà cung cấp: &nbsp;</p>
                <p className="textColor text-nowrap">{data.nhacungcap}</p>
              </div>
              <div className="row">
                <div className="col-6">
                  <h4 className="textColor">
                    {this.currencyFormat(data.gia.toString())} đ
                  </h4>
                </div>
                <div className="col-4">
                  <div
                    className="btn"
                    onClick={() => {
                      if (Global.isSignIn || Global.isLoggedInS) {
                        this.like();
                      } else {
                        this.setState({
                          err: "Bạn cần đăng nhập để thực hiện chức năng này",
                        });
                        timer2 = setTimeout(
                          () => this.setState({ err: "" }),
                          4000
                        );
                      }
                    }}
                  >
                    <img
                      src={
                        this.state.like
                          ? require("../images/heart-active.png")
                          : require("../images/heart.png")
                      }
                      className="img-fluid align-self-center"
                      alt="heart"
                      width="30px"
                    />
                  </div>
                </div>
              </div>
              <div className="row pl-3">
                <div className="d-inline">
                  <p className="mb-0">
                    Chính sách đổi trả: Đổi trả sản phẩm trong 30 ngày &nbsp;
                  </p>
                </div>
                <p className="textColor mb-0 text-nowrap">Xem ngay</p>
              </div>
              <SocialShare
                shareUrl={
                  "https://mybookstore.online/product/" + this.state.slug
                }
                title={data.tensp + " | mybookstore.online"}
              />
              <div className="btn-group" role="group" aria-label="First group">
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
                  className="btn btn-danger mybtn mb-0 text-nowrap"
                  onClick={() => this.addToCart(data._id)}
                >
                  Thêm vào giỏ hàng
                </div>

                <p className="mb-0 pl-4">
                  <div
                    className="btn btn-danger mybtn text-nowrap"
                    onClick={() => {
                      if (this.addToCart(data._id)) {
                        this.props.history.push("/cart");
                      }
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
          <div className="d-flex justify-content-center row px-2">
            {this.getSuggest(this.state.suggest)}
          </div>
        </div>

        {/*Thong tin chung*/}
        <div className="container bg-white p-3 mt-3">
          <h5 className="p-2">
            <b>Thông tin chung</b>
          </h5>
          <table className="ml-3">
            <tbody>
              <tr>
                <td className="w-25 text-secondary text-nowrap">
                  Nhà cung cấp
                </td>
                <td className="textColor">{data.nhacungcap}</td>
              </tr>
              <tr>
                <td className="w-25 text-secondary text-nowrap">
                  Nhà xuất bản
                </td>
                <td>{data.nxb}</td>
              </tr>
              <tr>
                <td className="w-25 text-secondary text-nowrap">
                  Năm xuất bản
                </td>
                <td>{data.namxb}</td>
              </tr>
              <tr>
                <td className="w-25 text-secondary text-nowrap">Tác giả</td>
                <td className="textColor">{data.tacgia}</td>
              </tr>
              <tr>
                <td className="w-25 text-secondary text-nowrap">Kích thước</td>
                <td>{data.kichthuoc}</td>
              </tr>
              <tr>
                <td className="w-25 text-secondary text-nowrap">Loại bìa</td>
                <td>{data.loaibia}</td>
              </tr>
              <tr>
                <td className="w-25 text-secondary text-nowrap">Số trang</td>
                <td>{data.sotrang}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/*Mo ta san pham*/}
        <div className="container bg-white p-3 mt-3">
          <h5 className="p-2">
            <b>Mô tả sản phẩm</b>
          </h5>
          <p className="text-justify ml-3">{data.mota}</p>
        </div>

        {/*Review*/}
        <div className="container bg-white p-3 mt-3" ref={this.myRef}>
          <h5>
            <b>Khách hàng nhận xét</b>
          </h5>
          {/* header nhận xét */}
          <div className="row py-3">
            <div className="col-sm-4 col-4">
              <h6 className="text-center">Đánh giá trung bình</h6>
              <p
                className="text-center mb-0"
                style={{ fontSize: "40px", color: "#eb2b3f" }}
              >
                {this.state.AVGRating}/5
              </p>
              <p className="text-center">{this.state.lengthComment} nhận xét</p>
            </div>
            <div className="col-sm-4 col-8">
              <div className="row">
                <div className="col-2 text-nowrap">
                  <p className="mb-0">
                    5 <i className="fas fa-star" />
                  </p>
                </div>
                <div className="col-10 align-self-center">
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: this.state.percentRating[4] + "%" }}
                    >
                      {this.state.percentRating[4]}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-2 text-nowrap">
                  <p className="mb-0">
                    4 <i className="fas fa-star" />
                  </p>
                </div>
                <div className="col-10 align-self-center">
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: this.state.percentRating[3] + "%" }}
                    >
                      {this.state.percentRating[3]}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-2 text-nowrap">
                  <p className="mb-0">
                    3 <i className="fas fa-star" />
                  </p>
                </div>
                <div className="col-10 align-self-center">
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: this.state.percentRating[2] + "%" }}
                    >
                      {this.state.percentRating[2]}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-2 text-nowrap">
                  <p className="mb-0">
                    2 <i className="fas fa-star" />
                  </p>
                </div>
                <div className="col-10 align-self-center">
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: this.state.percentRating[1] + "%" }}
                    >
                      {this.state.percentRating[1]}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-2 text-nowrap">
                  <p className="mb-0">
                    1 <i className="fas fa-star" />
                  </p>
                </div>
                <div className="col-10 align-self-center">
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: this.state.percentRating[0] + "%" }}
                    >
                      {this.state.percentRating[0]}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {this.state.isComment === undefined ? null : commentBtn} */}
          </div>
          <hr className="my-2" />
          {this.state.errCmt === "" ? null : errCommentJSX}
          {this.state.cmtSuccess === "" ? null : commentSuccessJSX}
          {/* viết nhận xét */}
          {this.state.isComment === undefined ? null : comment}
          {/* list nhận xét */}
          <div className="pt-3">{this.showComment(this.state.dataComment)}</div>
          {this.state.btnViewmore ? viewMoreJSX : null}
        </div>
      </div>
    );
  }
}

export default withRouter(ChiTietSanPham);
