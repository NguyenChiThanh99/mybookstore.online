import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Global from "./Global";
import axios from "axios";
import qs from "qs";
import MetaTags from "react-meta-tags";

import Header from "./Header";
import Footer from "./Footer";

export class HoaDon extends Component {
  constructor(props) {
    super(props);
    var { match } = this.props;
    this.state = {
      id: match.params.slug,
      info: {
        createdAt: "0001-01-01T01:01:01.000Z",
        diachi: "",
        dienthoai: "0000000000",
        ghichu: "",
        ten: "",
        thanhtoan: "",
        tongtien: 0,
        trangthai: '',
      },
      products: [
        {
          hinhanhsanpham: "https://uit-hotelbooking.000webhostapp.com/logo.png",
          tensp: "",
          tenurl: "",
          gia: 0,
          soluongsanpham: 0,
          iscomment: false,
        },
      ],
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getBill(this.state.id);
  };

  getBill = (id) => {
    const data = {
      id: id,
    };
    const url = Global.link + "orther/orderproduct";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      this.setState({
        loading: false,
        info: res.data.datainfo,
        products: res.data.dataproduct,
      });
    });
  };

  goToProDetail = (product) => {
    this.props.history.push(
      "/product/" +
        product.tenurl +
        "/" +
        this.state.id +
        "/" +
        product.iscomment
    );
  };

  showProduct = () => {
    var result = null;
    if (this.state.products.length > 0) {
      result = this.state.products.map((product, index) => {
        return (
          <div className="row pb-3" key={index}>
            <div className="col-lg-1 col-md-2 col-3">
              <img
                src={product.hinhanhsanpham}
                className="img-fluid"
                style={{ width: "70px" }}
                alt={product.tensp}
              />
            </div>
            <div className="col-lg-11 col-md-10 col-9">
              <div className="row">
                <NavLink to={"/product/" + product.tenurl} className="col-md-7">
                  <span>{product.tensp}</span>
                </NavLink>
                <div className="col-md-5">
                  <div className="row">
                    <div className="col-sm-4 col-6 text-nowrap">
                      <span>
                        {this.currencyFormat(product.gia.toString())} đ
                      </span>
                    </div>
                    <div className="col-sm-4 col-6">
                      <span>x {product.soluongsanpham}</span>
                    </div>
                    <div className="col-sm-4 an-thongtin">
                      <span>
                        {this.currencyFormat(
                          (product.gia * product.soluongsanpham).toString()
                        )}{" "}
                        đ
                      </span>
                    </div>
                  </div>
                </div>
                {product.iscomment ? null : (
                  <div className="pl-3 pt-1">
                    <a
                      href="# "
                      className="btn btn-outline-danger mybtn-outline"
                      onClick={() => {
                        this.goToProDetail(product);
                      }}
                    >
                      Nhận xét
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      });
    }
    return result;
  };

  currencyFormat = (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  render() {
    const { info } = this.state;
    var d = new Date(info.createdAt).toString().split(" ");
    var day = d[0] + " " + d[1] + " " + d[2] + " " + d[3] + " " + d[4];

    const loadingJSX = (
      <div className="container p-3 mt-3 d-flex justify-content-center">
        <img
          src={require("../images/loading.gif")}
          className="img-fluid align-self-center"
          alt="loading"
          width="150px"
        />
      </div>
    );

    const bodyProductJSX = (
      <div>
        {/* tiêu đề */}
        <div className="row pb-3 an-thongtin">
          <div className="col-sm-1 text-nowrap">
            <h6 style={{ fontWeight: "bold" }}>Tên sách</h6>
          </div>
          <div className="col-sm-11">
            <div className="row">
              <div className="col-sm-7" />
              <div className="col-sm-5">
                <div className="row">
                  <div className="col-sm-4">
                    <h6 style={{ fontWeight: "bold" }}>Giá</h6>
                  </div>
                  <div className="col-sm-4">
                    <h6 style={{ fontWeight: "bold" }}>Số lượng</h6>
                  </div>
                  <div className="col-sm-4">
                    <h6 style={{ fontWeight: "bold" }}>Tạm tính</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* nội dung */}
        {this.showProduct()}
        <hr className="mt-0" />
        {/* tổng cộng */}
        <div className="row pb-3">
          <div className="col-sm-1" />
          <div className="col-sm-11">
            <div className="row">
              <div className="col-lg-7 col-sm-5" />
              <div className="col-lg-5 col-sm-7">
                <div className="row">
                  <div className="col-sm-4 an-thongtin" />
                  <div className="col-sm-4 col-8">
                    <p style={{ display: "inline" }}>Tổng cộng</p>
                  </div>
                  <div className="col-sm-4 col-4 text-nowrap">
                    <p
                      style={{
                        display: "inline",
                        color: "#eb2b3f",
                        fontWeight: "bold",
                      }}
                    >
                      {this.currencyFormat(info.tongtien.toString())} đ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <Header />

        <MetaTags>
          <title>Hóa đơn mua hàng | mybookstore.online</title>
          <meta
            property="og:url"
            content={"https://mybookstore.online/bill/" + this.state.id}
          />
          <meta property="og:type" content="website" />
          <meta
            name="description"
            content="Thỏa sức mua sắm qua mạng với hàng ngàn mặt hàng sách tại mybookstore.online với giá rẻ hơn và nhiều ưu đãi hấp dẫn."
          />
          <meta
            property="og:title"
            content="Hóa đơn mua hàng | mybookstore.online"
          />
          <meta
            property="og:image"
            content={this.state.products[0].hinhanhsanpham}
          />
        </MetaTags>

        {/*Path*/}
        <div className="container py-2 px-2">
          <NavLink to="/">
            <p className="path float-left">Trang chủ /{"\u00A0"}</p>
          </NavLink>
          <NavLink to="/order-history">
            <p className="path float-left">Lịch sử giao dịch /{"\u00A0"}</p>
          </NavLink>
          <p className="path textColor">Hóa đơn</p>
        </div>

        {/* thông tin hóa đơn */}
        <div className="container pb-4 bg-white">
          <div>
            <h5 className="pt-3 pl-2">
              Chi tiết đơn hàng <span>#{this.state.id}</span>
            </h5>
            <div className="row">
              <div className="col-12 col-lg-6">
                <h5 className="pt-3 pl-2">Thông tin đơn hàng</h5>
                <div className="pl-4">
                  <table className="table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td className="align-top">Người nhận</td>
                        <td className="pl-4">{info.ten}</td>
                      </tr>
                      <tr>
                        <td className="align-top">Địa chỉ</td>
                        <td className="pl-4">{info.diachi}</td>
                      </tr>
                      <tr>
                        <td>Số điện thoại</td>
                        <td className="pl-4">{info.dienthoai}</td>
                      </tr>
                      <tr>
                        <td className="align-top">Ngày đặt hàng</td>
                        <td className="pl-4">{day}</td>
                      </tr>
                      <tr>
                        <td className="align-top">Ghi chú</td>
                        <td className="pl-4">{info.ghichu}</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap align-top">
                          Trạng thái đơn hàng
                        </td>
                        <td className="pl-4 ">{info.trangthai}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <h5 className="pt-3 pl-2">Hình thức thanh toán</h5>
                <p className="pl-4">{info.thanhtoan}</p>
              </div>
            </div>
          </div>
        </div>
        {/* end thông tin hóa đơn */}

        {/* sản phẩm */}
        <div className="container pb-4 mt-3 bg-white">
          {/* table sản phẩm */}
          <h4 className="pt-3 pl-2">Sản phẩm</h4>
          {this.state.loading ? loadingJSX : bodyProductJSX}

          <button
            onClick={() => {
              this.props.history.push("/");
            }}
            className="btn btn-danger mybtn mr-3 btn-viewmore-cart"
          >
            Trang chủ
          </button>
        </div>
        {/* end sản phẩm */}

        <Footer />
      </div>
    );
  }
}

export default withRouter(HoaDon);
