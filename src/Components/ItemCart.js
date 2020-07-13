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
          <div className="col-lg-1 col-md-2 col-3">
            <img
              src={item.hinhanhsanpham}
              className="img-fluid"
              style={{ width: "70px" }}
              alt={item.tensp}
            />
          </div>
          <div className="col-lg-10 col-7 col-md-8 align-self-center px-0">
            <div className="row">
              <div className="col-lg-9 align-self-center">
                <NavLink to={"/product/" + item.slug}>
                  <span>{item.tensp}</span>
                </NavLink>
              </div>
              <div className="col-lg-3">
                <div className="row align-self-center">
                  <div className="col-lg-6 align-self-center">
                    <span>{this.currencyFormat(item.gia.toString())} đ</span>
                  </div>
                  <div className="col-lg-6 pt-2">
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
          <div className="col-lg-1 col-1 col-md-1 align-self-center">
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
    );
  }
}
