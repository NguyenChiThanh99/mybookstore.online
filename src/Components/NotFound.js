import React, { Component } from "react";
import "../CSS/style.css";

export default class NotFound extends Component {
  render() {
    return (
      <div className="container bg-white p-3">
        <h3>404</h3>
        <h4>Xin lỗi, trang bạn đang tìm kiếm không tồn tại!</h4>
      </div>
    );
  }
}
