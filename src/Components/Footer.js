import React, { Component } from "react";

import "../CSS/style.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="container background1 p-1 mt-3">
        <div className="row">
          <div className="col-3 border-right border-white m-4 d-flex justify-content-center flex-column">
            <img
              src={require("../images/logo2.jpg")}
              className="img-fluid pb-2"
              alt="logo"
            />

            <p className="textFooter">Đồ án môn học</p>
            <p className="textFooter">
              Nhóm 3 - Thương mại điện tử và Triển khai ứng dụng NT210-K21
            </p>
            <p className="textFooter">
              Trường Đại học Công nghệ thông tin, Đại học Quốc gia thành phố Hồ
              Chí Minh
            </p>
          </div>
          <div className="col-8 m-4">
            <div className="row">
              <div className="col-4">
                <h5 className="mb-2">DỊCH VỤ</h5>
                <p className="textFooter mb-1">Điều khoản sử dụng</p>
                <p className="textFooter mb-1">Chính sách bảo mật</p>
                <p className="textFooter mb-1">Giới thiệu mybookstore.online</p>
              </div>
              <div className="col-4">
                <h5 className="mb-2">HỖ TRỢ</h5>
                <p className="textFooter mb-1">
                  Chính sách đổi - trả - hoàn tiền
                </p>
                <p className="textFooter mb-1">Phương thức vận chuyển</p>
                <p className="textFooter mb-1">Phương thức thanh toán</p>
              </div>
              <div className="col-4">
                <h5 className="mb-2">TÀI KHOẢN CỦA TÔI</h5>
                <p className="textFooter mb-1">Đăng nhập/Tạo mới tài khoản</p>
                <p className="textFooter mb-1">Chi tiết tài khoản</p>
                <p className="textFooter mb-1">Lịch sử mua hàng</p>
              </div>
            </div>
            <h5 className="mb-2 mt-4">LIÊN HỆ</h5>
            <div className="row">
              <div className="col-4 d-flex align-items-center">
                <div className="row ml-1">
                  <div className="col-2 p-0 d-flex align-items-center">
                    <img
                      src={require("../images/place.png")}
                      className="img-fluid"
                      alt="place"
                      width="28px"
                    />
                  </div>
                  <div className="col-10 p-0 m-0">
                    <p className="textFooter mb-0">
                      Trường ĐH Công nghệ thông tin, ĐHQG TpHCM
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4 d-flex align-items-center">
                <div className="row ml-1">
                  <div className="col-2 p-0">
                    <img
                      src={require("../images/envelope-solid.png")}
                      className="img-fluid"
                      alt="email"
                      width="18px"
                    />
                  </div>
                  <div className="col-10 pl-0">
                    <p className="textFooter mb-0">mybookstore@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="col-4 d-flex align-items-center">
                <div className="row ml-1">
                  <div className="col-2 p-0">
                    <img
                      src={require("../images/phone-solid.png")}
                      className="img-fluid"
                      alt="phone"
                      width="18px"
                    />
                  </div>
                  <div className="col-10">
                    <p className="textFooter mb-0">0123456789</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
