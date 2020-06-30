import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/giohang.css";
import "../CSS/style.css";

export default class ItemCart extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      item: this.props.item,
      soluong: this.props.item.soluongsanpham,
      context: this.props.context,
    };
  }
  
  tangsl = () => {
    if (this.state.soluong + 1 > 10) {
    } else {
      this.setState({
        soluong: this.state.soluong + 1,
      });
      this.props.getSoLuong({
        soluong: this.state.soluong + 1,
        id: this.props.item.idsanpham,
        gia: this.props.item.gia,
        action: true,
      });
    }
  };

  giamsl = () => {
    if (this.state.soluong - 1 > 0) {
      this.setState({
        soluong: this.state.soluong - 1,
      });
      this.props.getSoLuong({
        soluong: this.state.soluong - 1,
        id: this.props.item.idsanpham,
        gia: this.props.item.gia,
        action: false,
      });
    }
  };

  currencyFormat = num => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  getItem = (item) => {
    this.props.getItem(item);
  };

  render() {
    const {item} = this.state;
    return (
      <div>
        <div className="row pb-3">
          <div className="col-sm-1 col-3">
            <img
              src={item.hinhanhsanpham}
              className="img-fluid"
              style={{ width: "70px" }}
              alt={item.tensp}
            />
          </div>
          <div className="col-sm-10 col-7 px-0">
            <div className="row">
              <div className="col-sm-9">
                <NavLink to={"/product/" + item.slug} className="textColor">
                  <span>{item.tensp}</span>
                </NavLink>
              </div>
              <div className="col-sm-3">
                <div className="row">
                  <div className="col-sm-6">
                    <span>{this.currencyFormat(item.gia.toString())} đ</span>
                  </div>
                  <div className="col-sm-6 pt-2">
                    <div
                      className="btn-group btn-group-sm"
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
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                      >
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-1 col-1">
            <button
              type="button"
              className="btn btn-link mybtn-link"
              onClick={() => this.getItem(item)}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        <hr className="mt-0" />
      </div>

      // <tr>
      //   <td>
      //     <NavLink to={"/product/" + item.slug} className="textColor">{item.tensp}</NavLink>
      //   </td>
      //   <td>
      //     <img
      //       src={item.hinhanhsanpham}
      //       className="img-fluid align-self-center"
      //       alt="book1"
      //       width="80px"
      //     />
      //   </td>
      //   <td style={{ whiteSpace: "nowrap" }}>
      //     {this.currencyFormat(item.gia.toString())} đ
      //   </td>
      //   <td>
      //     <div className="btn-group" role="group" aria-label="First group">
      //       <button
      //         type="button"
      //         className="btn btn-outline-secondary"
      //         onClick={this.giamsl}
      //       >
      //         -
      //       </button>
      //       <button type="button" className="btn btn-outline-secondary">
      //         {this.state.soluong}
      //       </button>
      //       <button
      //         type="button"
      //         className="btn btn-outline-secondary"
      //         onClick={this.tangsl}
      //       >
      //         +
      //       </button>
      //     </div>
      //   </td>
      //   <td style={{ whiteSpace: "nowrap" }}>
      //     {this.currencyFormat(thanhtien.toString())} đ
      //   </td>
      //   <td>
      //     <button
      //       type="button"
      //       className="btn btn-danger mybtn mr-3"
      //       style={{ whiteSpace: "nowrap" }}
      //       onClick={() => this.getItem(item)}
      //     >
      //       Xóa bỏ
      //     </button>
      //   </td>
      // </tr>
    );
  }
}
