import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Global from "./Global";
import axios from "axios";
import qs from "qs";
import MetaTags from "react-meta-tags";

import Header from "../src/Components/Header";
import Footer from "../src/Components/Footer";

import "../CSS/history.css";

export class LichSuGiaoDich extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      empty: false,
    };
  }

  componentDidMount = () => {
    this.getHistory();
  };

  getHistory = () => {
    const data = {
      email: Global.isSignIn ? Global.user[0] : Global.user[0].email,
    };
    const url = Global.link + "orther/lichsugiaodich";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.data.length !== 0) {
        this.setState({
          data: res.data.data,
          loading: false,
        });
      } else {
        this.setState({
          empty: true,
          loading: false,
        });
      }
    });
  };

  currencyFormat = (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  showHistory = () => {
    var result = null;
    if (this.state.data.length > 0) {
      result = this.state.data.map((item, index) => {
        var d = new Date(item.createdAt).toString().split(" ");
        var day = d[0] + " " + d[1] + " " + d[2] + " " + d[3] + " " + d[4];
        return (
          <NavLink to={"/bill/" + item._id}>
            <div className="row">
              <div className="col-sm-3 pr-0 text-nowrap">
                <p className="mb-0 madonhang">{item._id}</p>
              </div>
              <div className="col-sm-2 pr-0">
                <p className="mb-0 ngay">{day}</p>
              </div>
              <div className="col-sm-4 pr-0">
                <p className="mb-0 sanpham">{item.tensp}</p>
              </div>
              <div className="col-sm-1 text-nowrap pr-0">
                <p className="mb-0 an-thongtin">
                  {this.currencyFormat(item.tongtien.toString())} đ
                </p>
              </div>
              <div className="col-sm-2">
                <p className="mb-3 trangthai">Giao hàng thành công</p>
              </div>
            </div>
            <hr />
          </NavLink>
        );
      });
    }
    return result;
  };

  render() {
    const bodyJSX = (
      <div>
        <div className="an-thongtin">
          <div className="row pt-2">
            <div className="col-sm-3 text-nowrap">
              <h6 style={{ fontWeight: "bold" }}>Mã đơn hàng </h6>
            </div>
            <div className="col-sm-2 text-nowrap">
              <h6 style={{ fontWeight: "bold" }}>Ngày mua</h6>
            </div>
            <div className="col-sm-4 text-nowrap">
              <h6 style={{ fontWeight: "bold" }}>Sản phẩm</h6>
            </div>
            <div className="col-sm-1 text-nowrap">
              <h6 style={{ fontWeight: "bold" }}>Tổng tiền</h6>
            </div>
            <div className="col-sm-2 text-nowrap">
              <h6 style={{ fontWeight: "bold" }}>Trạng thái</h6>
            </div>
          </div>
          <hr className="mt-0" />
        </div>
        {this.showHistory()}
      </div>
    );

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

    const emptyJSX = (
      <div className="container bg-white p-3 mt-3 text-center">
        <p>Bạn chưa có đơn hàng nào</p>
        <button
          onClick={() => {
            this.props.history.push("/");
          }}
          className="btn btn-danger mybtn mr-3 btn-viewmore-cart"
        >
          Đi đến trang chủ
        </button>
      </div>
    );

    return (
      <div className="container pb-0 px-0">
        <Header />

        <MetaTags>
          <title>Lịch sử giao dịch | mybookstore.online</title>
          <meta
            property="og:url"
            content="https://mybookstore.online/order-history"
          />
          <meta property="og:type" content="website" />
          <meta
            name="description"
            content="Thỏa sức mua sắm qua mạng với hàng ngàn mặt hàng sách tại mybookstore.online với giá rẻ hơn và nhiều ưu đãi hấp dẫn."
          />
          <meta
            property="og:title"
            content="Lịch sử giao dịch | mybookstore.online"
          />
          <meta
            property="og:image"
            content="https://uit-hotelbooking.000webhostapp.com/logo.png"
          />
        </MetaTags>

        {/*Path*/}
        <div className="container py-2 px-2">
          <NavLink to="/">
            <p className="path float-left">Trang chủ /{"\u00A0"}</p>
          </NavLink>
          <p className="path textColor">Lịch sử giao dịch</p>
        </div>

        {/* Lịch sử giao dịch */}
        <div className="bg-white container">
          <h5 className="pt-3">LỊCH SỬ GIAO DỊCH</h5>
          {this.state.loading ? loadingJSX : null}
          {this.state.empty ? emptyJSX : null}
          {this.state.data.length !== 0 ? bodyJSX : null}
        </div>

        <Footer />
      </div>
    );
  }
}

export default withRouter(LichSuGiaoDich);