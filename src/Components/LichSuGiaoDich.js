import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Global from "./Global";
import axios from "axios";
import qs from "qs";
import MetaTags from "react-meta-tags";

export default class LichSuGiaoDich extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    this.getHistory();
  }

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
      this.setState({
        data: res.data.data,
      });
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
          <tr>
            <td>
              <NavLink class="textColor" to={"/bill/" + item._id}>{item._id}</NavLink>
            </td>
            <td>
              {day}
            </td>
            <td>{item.tensp}</td>
            <td>{this.currencyFormat(item.tongtien.toString())} đ</td>
            <td>Giao hàng thành công</td>
          </tr>
        );
      });
    }
    return result;
  };

  render() {
    if (this.state.data.length !== 0) {
      return (
        <div className="container pb-0">
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
          <div className="container py-2 px-0">
            <NavLink to="/">
              <p className="path float-left">Trang chủ /{"\u00A0"}</p>
            </NavLink>
            <p className="path textColor">Lịch sử giao dịch</p>
          </div>

          {/* Lịch sử giao dịch */}
          <div id="lichsugiaodich" className="bg-white">
            <h5 className="pt-3 pl-2">LỊCH SỬ GIAO DỊCH</h5>
            <table className="table table-striped">
              <thead>
                <tr className="text-nowrap">
                  <th>Mã đơn hàng</th>
                  <th>Ngày mua</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>{this.showHistory()}</tbody>
            </table>
          </div>
        </div>
      );
    } else {return null}
  }
}
