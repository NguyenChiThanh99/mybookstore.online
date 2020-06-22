import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../CSS/danhsachsp.css";

export default class DanhSachSanPham extends Component {
  constructor(props) {
    super(props);
    var { match } = this.props;
    this.state = {
      slug: match.params.slug,
      data: [],
    };
  }
  render() {
    console.log(this.state.slug)
    return (
      <div>
        {/*Path*/}
        <div className="container py-2">
          <p className="path float-left">Trang chủ / Văn học /&nbsp;</p>
          <p className="path textColor">Tiểu thuyết</p>
        </div>
        {/*Main*/}
        <div className="container">
          <div className="row">
            <div className="col-3 pl-0">
              {/*Danh muc*/}

              <div style={{ backgroundColor: "white" }}>
                <div className="list">
                  <span>Danh mục sản phẩm</span>
                </div>
                <nav className="nav flex-column">
                  {/* văn học */}
                  <div className="dropright d-flex flex-row-reverse">
                    <button
                      type="button"
                      className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright"
                      data-toggle="dropdown"
                    />
                    <a className="nav-link list-item flex-fill" href="# ">
                      Văn học
                    </a>
                    <div className="dropdown-menu">
                      <table className="table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tiểu thuyết
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Truyện ngắn
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Light Novel
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Truyện trinh thám
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Ngôn tình
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tác phẩm kinh điển
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Huyền bí - Giả tưởng
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Thơ ca, tục ngữ
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Phóng sự, ký sự
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Truyện tranh
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                12 cung hoàng đạo
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tuổi teen
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Truyện cười
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Sách ảnh
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Du ký
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Kinh dị
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* sách thiếu nhi */}
                  <div className="dropright d-flex flex-row-reverse">
                    <button
                      type="button"
                      className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright"
                      data-toggle="dropdown"
                    />
                    <a className="nav-link list-item flex-fill" href="# ">
                      Sách thiếu nhi
                    </a>
                    <div className="dropdown-menu">
                      <table className="table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Truyện thiếu nhi
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Manga - Comic
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Kiến thức bách khoa
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Kỹ năng sống cho trẻ
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Từ điển thiếu nhi
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Flashcard
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tạp chí thiếu nhi
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Sách nói
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tô màu, luyện chữ
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* kinh tế */}
                  <div className="dropright d-flex flex-row-reverse">
                    <button
                      type="button"
                      className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright"
                      data-toggle="dropdown"
                    />
                    <a className="nav-link list-item flex-fill" href="# ">
                      Kinh tế
                    </a>
                    <div className="dropdown-menu">
                      <table className="table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Quản trị - lãnh đạo
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Marketing - bán hàng
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Nhân vật - bài học kinh doanh
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Phân tích kinh tế
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Khởi nghiệp làm giàu
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tài chính - ngân hàng
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Chứng khoáng - bất động sản
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Nhân sự - việc làm
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Ngoại thương
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Kế toán - kiểm toán - thuế
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* tiểu sử, hồi ký */}
                  <div className="dropright d-flex flex-row-reverse">
                    <button
                      type="button"
                      className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright"
                      data-toggle="dropdown"
                    />
                    <a className="nav-link list-item flex-fill" href="# ">
                      Tiểu sử - hồi ký
                    </a>
                    <div className="dropdown-menu">
                      <table className="table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Câu chuyện cuộc đời
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Chính trị
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Nghệ thuật - giải trí
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Lịch sử
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Kinh tế
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Thể thao
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Tâm lý - kỹ năng sống */}
                  <div className="dropright d-flex flex-row-reverse">
                    <button
                      type="button"
                      className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright"
                      data-toggle="dropdown"
                    />
                    <a className="nav-link list-item flex-fill" href="# ">
                      Tâm lý - kỹ năng sống
                    </a>
                    <div className="dropdown-menu">
                      <table className="table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Kỹ năng sống
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Rèn luyện nhân cách
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tâm lý
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Sách cho tuổi mới lớn
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Hạt giống tâm hồn
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Sách giáo khoa */}
                  <div className="dropright d-flex flex-row-reverse">
                    <button
                      type="button"
                      className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright"
                      data-toggle="dropdown"
                    />
                    <a className="nav-link list-item flex-fill" href="# ">
                      Sách giáo khoa - tham khảo
                    </a>
                    <div className="dropdown-menu">
                      <table className="table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Cấp 1
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Cấp 2
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Cấp 3
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Mẫu giáo
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Luyện thi Đại học
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Sách giáo viên
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Đại học
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Nuôi dạy con */}
                  <div className="dropright d-flex flex-row-reverse">
                    <button
                      type="button"
                      className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright"
                      data-toggle="dropdown"
                    />
                    <a className="nav-link list-item flex-fill" href="# ">
                      Nuôi dạy con
                    </a>
                    <div className="dropdown-menu">
                      <table className="table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Cẩm nang làm cha mẹ
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Phát triển kỹ năng - trí tuệ cho trẻ
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Phương pháp giáo dục trẻ các nước
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Dinh dưỡng - Sức khỏe cho trẻ
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Dành cho mẹ bầu
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Giáo dục trẻ tuổi teen
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Sách ngoại ngữ */}
                  <div className="dropright d-flex flex-row-reverse">
                    <button
                      type="button"
                      className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright"
                      data-toggle="dropdown"
                    />
                    <a className="nav-link list-item flex-fill" href="# ">
                      Sách ngoại ngữ
                    </a>
                    <div className="dropdown-menu">
                      <table className="table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tiếng Anh
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tiếng Nhật
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tiếng Trung
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tiếng Hàn
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tiếng Pháp
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Ngoại ngữ khác
                              </a>
                            </td>
                            <td>
                              <a
                                className="nav-link text-dark text-nowrap mya-dropright"
                                href="# "
                              >
                                Tiếng Việt cho người ngước ngoài
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </nav>
              </div>

              {/*Price*/}
              <div className="bg-white">
                <div className="text-center text-light background1 p-0 mt-3">
                  <p className="header">Giá</p>
                </div>
                <div className="price mt-3 ml-4">
                  <label className="radio mb-0">
                    <p className="fontPrice pb-0">0 - 100.00đ</p>
                    <input type="radio" defaultChecked="checked" name="price" />
                    <span className="checkround" />
                  </label>
                  <label className="radio mb-0">
                    <p className="fontPrice pb-0">100.000đ - 200.000đ</p>
                    <input type="radio" name="price" />
                    <span className="checkround" />
                  </label>
                  <label className="radio mb-0">
                    <p className="fontPrice pb-0">200.000đ - 500.000đ</p>
                    <input type="radio" name="price" />
                    <span className="checkround" />
                  </label>
                  <label className="radio mb-0 pb-2">
                    <p className="fontPrice pb-0">500.000đ trở lên</p>
                    <input type="radio" name="price" />
                    <span className="checkround" />
                  </label>
                </div>
              </div>
            </div>
            {/*Danh sach san pham*/}
            <div className="col-9 bg-white p-3">
              <ul className="d-flex justify-content-center">
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
              </ul>
              <ul className="d-flex justify-content-center">
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
              </ul>
              <ul className="d-flex justify-content-center">
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
                <li className="book d-flex flex-column mx-2">
                  <NavLink to="/chitietsanpham">
                    <img
                      src={require("../images/book5.gif")}
                      className="img-fluid align-self-center"
                      alt="book1"
                      width="120px"
                    />
                    <p className="bookItem mb-2">
                      Tôi thấy hoa vàng trên cỏ xanh
                    </p>
                    <p className="bookItem">
                      <small>Nguyễn Nhật Ánh</small>
                    </p>
                    <h6 className="bookItem textColor">
                      <b>83.090 đ</b>
                    </h6>
                  </NavLink>
                </li>
              </ul>
              <div className="row py-0 pl-4">
                <a href="# " className="distance">
                  &lt; Quay lại
                </a>
                <a href="# ">Xem thêm &gt;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
