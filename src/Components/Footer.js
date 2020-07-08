import React, { Component } from "react";

import "../CSS/style.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="container-fluid background1 mt-3 py-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-4 pt-2 d-flex justify-content-center flex-column">
              <img
                src={require("../images/logo2.png")}
                className="img-fluid p-2 w-75"
                alt="logoWeb"
              />
              <p className="textFooter pl-2">Website phục vụ Đồ án môn học</p>
              <p className="textFooter pl-2">
                Nhóm 3 - Thương mại điện tử và Triển khai ứng dụng NT210.K21 -
                ThS. Trần Tuấn Dũng
              </p>
              <p className="textFooter pl-2">
                Trường Đại học Công nghệ Thông tin, Đại học Quốc gia Tp.HCM
              </p>
              {/* <p className="textFooter pl-2">
                Nhóm 6 - Lập trình ứng dụng mạng NT109.K21 - ThS. Đỗ Thị Hương
                Lan
              </p> */}
            </div>
            <div className="col-12 col-sm-8">
              <div className="row">
                <div className="col-12 col-sm-4 pt-3">
                  <h5 className="mb-2">DỊCH VỤ</h5>
                  <p className="textFooter mb-2 pl-2">Điều khoản sử dụng</p>
                  <p className="textFooter mb-2 pl-2">Chính sách bảo mật</p>
                  <p className="textFooter mb-2 pl-2">
                    Giới thiệu mybookstore.online
                  </p>
                </div>
                <div className="col-12 col-sm-4 pt-3">
                  <h5 className="mb-2">HỖ TRỢ</h5>
                  <p className="textFooter mb-2 pl-2">
                    Chính sách đổi - trả - hoàn tiền
                  </p>
                  <p className="textFooter mb-2 pl-2">Phương thức vận chuyển</p>
                  <p className="textFooter mb-2 pl-2">Phương thức thanh toán</p>
                </div>
                <div className="col-12 col-sm-4 pt-3">
                  <h5 className="mb-2">TÀI KHOẢN CỦA TÔI</h5>
                  <p className="textFooter mb-2 pl-2">
                    Đăng nhập/Tạo mới tài khoản
                  </p>
                  <p className="textFooter mb-2 pl-2">Chi tiết tài khoản</p>
                  <p className="textFooter mb-2 pl-2">Lịch sử mua hàng</p>
                </div>
              </div>
              <h5 className="mb-2 mt-3">LIÊN HỆ</h5>
              <div className="row pb-4">
                <div className="col-12 col-sm-4">
                  <div className="row ml-0">
                    <div className="col-1 p-0">
                      <img
                        src={require("../images/place.png")}
                        className="img-fluid"
                        alt="place"
                        width="18px"
                      />
                    </div>
                    <div className="col-11 pl-0">
                      <p className="textFooter mb-0">
                        Trường ĐH Công nghệ thông tin, ĐHQG TPHCM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="row ml-0">
                    <div className="col-1 p-0">
                      <img
                        src={require("../images/envelope-solid.png")}
                        className="img-fluid"
                        alt="email"
                        width="18px"
                      />
                    </div>
                    <div className="col-11 pl-0">
                      <p className="textFooter mb-0">mybookstore@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="row ml-0">
                    <div className="col-1 p-0">
                      <img
                        src={require("../images/phone-solid.png")}
                        className="img-fluid"
                        alt="phone"
                        width="18px"
                      />
                    </div>
                    <div className="col-11 pl-0">
                      <p className="textFooter mb-0">0123456789</p>
                    </div>
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
