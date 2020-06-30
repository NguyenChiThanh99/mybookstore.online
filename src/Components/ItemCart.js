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
                <div className="col-sm-6 gia-sanpham">
                  <span>{this.currencyFormat(item.gia.toString())} đ</span>
                </div>
                <div className="col-sm-6">
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="First group"
                    onClick={this.giamsl}
                  >
                    <button type="button" className="btn btn-outline-secondary">
                      -
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
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
    );
  }
}
