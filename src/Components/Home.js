import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Global from "./Global";
import axios from "axios";
import qs from "qs";
import MetaTags from "react-meta-tags";

import "../CSS/mystyle.css";
import "../fontawesome-free-5.13.0-web/css/all.css";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastest_prod_arr: [],
      lastest_prod_page: 0,
      hot_prod_arr: [],
      dropdown: window.innerWidth <= 576 ? "down" : "right",
    };
  }

  componentDidMount() {
    this.get_lastest_prod(this.state.lastest_prod_page);
    this.get_hot_prod();
  }

  currencyFormat = (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  get_lastest_prod = (page) => {
    const data = {
      page: page,
    };
    const url = Global.link + "product/spmoinhat";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      var nextPage = this.state.lastest_prod_page + 1;
      this.setState({
        lastest_prod_arr: this.state.lastest_prod_arr.concat(res.data.product),
        lastest_prod_page: nextPage,
      });
    });
  };

  get_hot_prod = () => {
    const url = Global.link + "product/sphot";
    const options = {
      method: "GET",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
    };
    axios(options).then((res) => {
      this.setState({
        hot_prod_arr: res.data.product,
      });
    });
  };

  show_6_lastest_prod = (arr_6prod, page) => {
    var start = (page - 1) * 6;
    var result = null;
    result = arr_6prod.map((product, index) => {
      if (index >= start && index < start + 6) {
        return (
          <div
            className="col-lg-2 col-md-3 col-sm-4 col-6 product_shadow my-2"
            key={index}
          >
            <NavLink to={"/product/" + product.tenurl}>
              <img
                src={product.hinhanhsanpham}
                className="img-fluid align-self-center"
                alt={product.tensp}
              />
              <div style={{ height: 50 }}>
                <p className="mb-2 book_item_title">{product.tensp}</p>
              </div>
              <div style={{ height: 18 }}>
                <p className="mb-0">
                  <small className="book_item_title2">
                    {product.tacgia === " " ? null : product.tacgia}
                  </small>
                </p>
              </div>
              <h6 className="textColor">
                <b>{this.currencyFormat(product.gia.toString())} đ</b>
              </h6>
            </NavLink>
          </div>
        );
      } else {
        return null;
      }
    });
    return result;
  };

  show_lastest_prod = () => {
    var page_arr = [];
    for (var i = 0; i < this.state.lastest_prod_page; i++) {
      page_arr.push(i);
    }
    var result = null;
    if (this.state.lastest_prod_arr.length > 0) {
      result = page_arr.map((page, index) => {
        return (
          <div className="d-flex justify-content-center row px-2" key={index}>
            {this.show_6_lastest_prod(this.state.lastest_prod_arr, index + 1)}
          </div>
        );
      });
    }
    return result;
  };

  show_hot_prod = () => {
    var result = null;
    if (this.state.hot_prod_arr.length > 0) {
      result = this.state.hot_prod_arr.map((product, index) => {
        return (
          <div
            className="col-lg-2 col-md-3 col-sm-4 col-6 product_shadow my-2"
            key={index}
          >
            <NavLink to={"/product/" + product.tenurl}>
              <img
                src={product.hinhanhsanpham}
                className="img-fluid align-self-center"
                alt={product.tensp}
              />
              <div style={{ height: 50 }}>
                <p className="mb-2 book_item_title">{product.tensp}</p>
              </div>
              <div style={{ height: 18 }}>
                <p className="mb-0">
                  <small className="book_item_title2">
                    {product.tacgia === " " ? null : product.tacgia}
                  </small>
                </p>
              </div>
              <h6 className="textColor">
                <b>{this.currencyFormat(product.gia.toString())} đ</b>
              </h6>
            </NavLink>
          </div>
        );
      });
    }
    return result;
  };

  goToCategory = (type) => {
    this.props.history.push("/category/" + type);
  };

  render() {
    const viewMoreLastestJSX = (
      <div className="viewmore pb-2 mt-2">
        <button
          className="btn btn-danger mybtn"
          onClick={() => this.get_lastest_prod(this.state.lastest_prod_page)}
        >
          Xem thêm
        </button>
      </div>
    );

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <button
        ref={ref}
        className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      />
      // <a className="row m-0" href="# " ref={ref}>
      //   <div
      //     className="nav-link list-item flex-fill"
      //     onClick={(e) => {
      //       this.goToCategory(children);
      //     }}
      //   >
      //     {children}
      //   </div>
      //   <button
      //     className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright list-item"
      //     onClick={(e) => {
      //       e.preventDefault();
      //       onClick(e);
      //     }}
      //   />
      // </a>
    ));

    return (
      <div>
        <MetaTags>
          <title>Nhà sách trực tuyến mybookstore.online</title>
          <meta property="og:url" content="https://mybookstore.online" />
          <meta property="og:type" content="website" />
          <meta
            name="description"
            content="Thỏa sức mua sắm qua mạng với hàng ngàn mặt hàng sách tại mybookstore.online với giá rẻ hơn và nhiều ưu đãi hấp dẫn."
          />
          <meta
            property="og:title"
            content="Nhà sách trực tuyến mybookstore.online"
          />
          <meta
            property="og:image"
            content="https://uit-hotelbooking.000webhostapp.com/logo.png"
          />
        </MetaTags>

        <div className="container px-3 pt-2">
          <div className="row">
            <NavLink to="/">
              <p className="path float-left textColor">Trang chủ</p>
            </NavLink>
          </div>
        </div>

        <div className="container p-0">
          <div className="row">
            <div className="col-md-4 pt-2">
              <div style={{ backgroundColor: "white" }}>
                <div className="list">
                  <span>Danh mục sản phẩm</span>
                </div>
                <nav className="nav flex-column">
                  <Dropdown
                    drop={this.state.dropdown}
                    className="d-flex flex-row-reverse"
                  >
                    <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                    <a
                      href="# "
                      className="nav-link list-item flex-fill"
                      onClick={(e) => {
                        this.goToCategory("Văn học");
                      }}
                    >
                      Văn học
                    </a>
                    <Dropdown.Menu style={{ maxWidth: 'max-content'}}>
                      <div className="row dropright-mobile">
                        <div
                          className="col-sm-3 col-6"
                          style={{ maxWidth: "fit-content" }}
                        >
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Tiểu thuyết");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Tiểu thuyết
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Truyện ngắn");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Truyện ngắn
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Light Novel");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Light Novel
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Truyện trinh thám");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Truyện trinh thám
                          </a>
                        </div>
                        <div
                          className="col-sm-3 col-6"
                          style={{ maxWidth: "fit-content" }}
                        >
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Ngôn tình");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Ngôn tình
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Tác phẩm kinh điển");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Tác phẩm kinh điển
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Huyền bí - Giả tưởng");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Huyền bí - Giả tưởng
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Thơ ca, tục ngữ");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Thơ ca, tục ngữ
                          </a>
                        </div>
                        <div
                          className="col-sm-3 col-6"
                          style={{ maxWidth: "fit-content" }}
                        >
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Phóng sự, ký sự");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Phóng sự, ký sự
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Truyện tranh");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Truyện tranh
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|12 cung hoàng đạo");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            12 cung hoàng đạo
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Tuổi teen");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Tuổi teen
                          </a>
                        </div>
                        <div
                          className="col-sm-3 col-6"
                          style={{ maxWidth: "fit-content" }}
                        >
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Truyện cười");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Truyện cười
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Sách ảnh");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Sách ảnh
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Du ký");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Du ký
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Văn học|Kinh dị");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Kinh dị
                          </a>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown
                    drop={this.state.dropdown}
                    className="d-flex flex-row-reverse"
                  >
                    <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                    <a
                      href="# "
                      className="nav-link list-item flex-fill"
                      onClick={(e) => {
                        this.goToCategory("Sách thiếu nhi");
                      }}
                    >
                      Sách thiếu nhi
                    </a>
                    <Dropdown.Menu style={{ marginRight: "9%" }}>
                      <div className="row dropright-mobile">
                        <div
                          className="col-sm-3 col-6"
                          style={{ maxWidth: "fit-content" }}
                        >
                          <a
                            onClick={() => {
                              this.goToCategory(
                                "Sách thiếu nhi|Truyện thiếu nhi"
                              );
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Truyện thiếu nhi
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Sách thiếu nhi|Manga - Comic");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Manga - Comic
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory(
                                "Sách thiếu nhi|Kiến thức bách khoa"
                              );
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Kiến thức bách khoa
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory(
                                "Sách thiếu nhi|Kỹ năng sống cho trẻ"
                              );
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Kỹ năng sống cho trẻ
                          </a>
                        </div>
                        <div
                          className="col-sm-3 col-6"
                          style={{ maxWidth: "fit-content" }}
                        >
                          <a
                            onClick={() => {
                              this.goToCategory(
                                "Sách thiếu nhi|Từ điển thiếu nhi"
                              );
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Từ điển thiếu nhi
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Sách thiếu nhi|Flashcard");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Flashcard
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory(
                                "Sách thiếu nhi|Tạp chí thiếu nhi"
                              );
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Tạp chí thiếu nhi
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Sách thiếu nhi|Sách nói");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Sách nói
                          </a>
                        </div>
                        <div
                          className="col-sm-3 col-6"
                          style={{ maxWidth: "fit-content" }}
                        >
                          <a
                            onClick={() => {
                              this.goToCategory(
                                "Sách thiếu nhi|Tô màu, luyện chữ"
                              );
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Tô màu, luyện chữ
                          </a>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown
                    drop={this.state.dropdown}
                    className="d-flex flex-row-reverse"
                  >
                    <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                    <a
                      href="# "
                      className="nav-link list-item flex-fill"
                      onClick={(e) => {
                        this.goToCategory("Kinh tế");
                      }}
                    >
                      Kinh tế
                    </a>
                    <Dropdown.Menu style={{ marginRight: "9%" }}>
                      <div className="row dropright-mobile">
                        <div
                          className="col-sm-3 col-6"
                          style={{ maxWidth: "fit-content" }}
                        >
                          <a
                            onClick={() => {
                              this.goToCategory("Kinh tế|Quản trị - lãnh đạo");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Quản trị - lãnh đạo
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Kinh tế|Marketing - bán hàng");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Marketing - bán hàng
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory(
                                "Kinh tế|Nhân vật - bài học kinh doanh"
                              );
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Nhân vật - bài học kinh doanh
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Kinh tế|Phân tích kinh tế");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Phân tích kinh tế
                          </a>
                        </div>
                        <div
                          className="col-sm-3 col-6"
                          style={{ maxWidth: "fit-content" }}
                        >
                          <a
                            onClick={() => {
                              this.goToCategory("Kinh tế|Khởi nghiệp làm giàu");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Khởi nghiệp làm giàu
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory(
                                "Kinh tế|Tài chính - ngân hàng"
                              );
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Tài chính - ngân hàng
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory(
                                "Kinh tế|Chứng khoáng - bất động sản"
                              );
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Chứng khoáng - bất động sản
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory("Kinh tế|Nhân sự - việc làm");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Nhân sự - việc làm
                          </a>
                        </div>
                        <div
                          className="col-sm-3 col-6"
                          style={{ maxWidth: "fit-content" }}
                        >
                          <a
                            onClick={() => {
                              this.goToCategory("Kinh tế|Ngoại thương");
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Ngoại thương
                          </a>
                          <a
                            onClick={() => {
                              this.goToCategory(
                                "Kinh tế|Kế toán - kiểm toán - thuế"
                              );
                            }}
                            className="nav-link text-dark text-nowrap mya-dropright"
                            href="# "
                          >
                            Kế toán - kiểm toán - thuế
                          </a>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>


                  <Dropdown drop="right">
                    <Dropdown.Toggle as={CustomToggle}>
                      Tiểu sử - hồi ký
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="p-0 bg-white">
                        <table className="table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tiểu sử - hồi ký|Câu chuyện cuộc đời"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Câu chuyện cuộc đời
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tiểu sử - hồi ký|Chính trị"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Chính trị
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tiểu sử - hồi ký|Nghệ thuật - giải trí"
                                    );
                                  }}
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
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tiểu sử - hồi ký|Lịch sử"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Lịch sử
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tiểu sử - hồi ký|Kinh tế"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Kinh tế
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tiểu sử - hồi ký|Thể thao"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Thể thao
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown drop="right">
                    <Dropdown.Toggle as={CustomToggle}>
                      Tâm lý - Kỹ năng sống
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="p-0 bg-white">
                        <table className="table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tâm lý - Kỹ năng sống|Kỹ năng sống"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Kỹ năng sống
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tâm lý - Kỹ năng sống|Rèn luyện nhân cách"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Rèn luyện nhân cách
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tâm lý - Kỹ năng sống|Tâm lý"
                                    );
                                  }}
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
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tâm lý - Kỹ năng sống|Sách cho tuổi mới lớn"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Sách cho tuổi mới lớn
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Tâm lý - Kỹ năng sống|Hạt giống tâm hồn"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Hạt giống tâm hồn
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown drop="right">
                    <Dropdown.Toggle as={CustomToggle}>
                      Sách giáo khoa - tham khảo
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="p-0 bg-white">
                        <table className="table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách giáo khoa - tham khảo|Cấp 1"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Cấp 1
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách giáo khoa - tham khảo|Cấp 2"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Cấp 2
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách giáo khoa - tham khảo|Cấp 3"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Cấp 3
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách giáo khoa - tham khảo|Mẫu giáo"
                                    );
                                  }}
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
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách giáo khoa - tham khảo|Luyện thi Đại học"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Luyện thi Đại học
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách giáo khoa - tham khảo|Sách giáo viên"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Sách giáo viên
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách giáo khoa - tham khảo|Đại học"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Đại học
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown drop="right">
                    <Dropdown.Toggle as={CustomToggle}>
                      Nuôi dạy con
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="p-0 bg-white">
                        <table className="table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Nuôi dạy con|Cẩm nang làm cha mẹ"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Cẩm nang làm cha mẹ
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Nuôi dạy con|Phát triển kỹ năng - trí tuệ cho trẻ"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Phát triển kỹ năng - trí tuệ cho trẻ
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Nuôi dạy con|Phương pháp giáo dục trẻ các nước"
                                    );
                                  }}
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
                                  onClick={() => {
                                    this.goToCategory(
                                      "Nuôi dạy con|Dinh dưỡng - Sức khỏe cho trẻ"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Dinh dưỡng - Sức khỏe cho trẻ
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Nuôi dạy con|Dành cho mẹ bầu"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Dành cho mẹ bầu
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Nuôi dạy con|Giáo dục trẻ tuổi teen"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Giáo dục trẻ tuổi teen
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown drop="right">
                    <Dropdown.Toggle as={CustomToggle}>
                      Sách ngoại ngữ
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="p-0 bg-white">
                        <table className="table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách ngoại ngữ|Tiếng Anh"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Tiếng Anh
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách ngoại ngữ|Tiếng Nhật"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Tiếng Nhật
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách ngoại ngữ|Tiếng Trung"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Tiếng Trung
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách ngoại ngữ|Tiếng Hàn"
                                    );
                                  }}
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
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách ngoại ngữ|Tiếng Pháp"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Tiếng Pháp
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách ngoại ngữ|Ngoại ngữ khác"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Ngoại ngữ khác
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách ngoại ngữ|Tiếng Việt cho người ngước ngoài"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Tiếng Việt cho người ngước ngoài
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </nav>
              </div>
            </div>
            <div className="col-md-8 pt-2 pl-0">
              {/* slide */}
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={0}
                    className="active"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={1}
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={2}
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={3}
                  />
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={
                        "https://res.cloudinary.com/chefood/image/upload/v1593150605/mybookstore_banner/carousel0_f5rxbe.jpg"
                      }
                      className="d-block w-100 img-fluid"
                      alt="Quảng cáo sản phẩm"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={
                        "https://res.cloudinary.com/chefood/image/upload/v1593150609/mybookstore_banner/carousel1_yuesxn.jpg"
                      }
                      className="d-block w-100 img-fluid"
                      alt="Quảng cáo sản phẩm"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={
                        "https://res.cloudinary.com/chefood/image/upload/v1593150605/mybookstore_banner/carousel2_hjflza.jpg"
                      }
                      className="d-block w-100 img-fluid"
                      alt="Quảng cáo sản phẩm"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={
                        "https://res.cloudinary.com/chefood/image/upload/v1593150606/mybookstore_banner/carousel3_pwqj62.jpg"
                      }
                      className="d-block w-100 img-fluid"
                      alt="Quảng cáo sản phẩm"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
              {/* end slide  */}
            </div>
          </div>
        </div>

        <div className="container px-3 bg-white mt-3 pb-3">
          <div className="row px-1">
            <div className="col-sm-3 col-6 mt-3 px-2">
              <img
                src={
                  "https://res.cloudinary.com/chefood/image/upload/v1593220993/mybookstore_banner/ad1_cmmttd.jpg"
                }
                alt="Quảng cáo sản phẩm"
                className="img-fluid"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-sm-3 col-6 mt-3 px-2">
              <img
                src={
                  "https://res.cloudinary.com/chefood/image/upload/v1593220994/mybookstore_banner/ad2_hseykv.jpg"
                }
                alt="Quảng cáo sản phẩm"
                className="img-fluid"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-sm-3 col-6 mt-3 px-2">
              <img
                src={
                  "https://res.cloudinary.com/chefood/image/upload/v1593150931/mybookstore_banner/ad3_v1lqcm.jpg"
                }
                alt="Quảng cáo sản phẩm"
                className="img-fluid"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-sm-3 col-6 mt-3 px-2">
              <img
                src={
                  "https://res.cloudinary.com/chefood/image/upload/v1593150930/mybookstore_banner/ad4_rcwdk4.png"
                }
                alt="Quảng cáo sản phẩm"
                className="img-fluid"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Lastest product */}
        {this.state.lastest_prod_arr.length === 0 ? null : (
          <div className="container bg-white p-3 mt-3">
            <h5 className="p-2">
              <b>Sản phẩm mới nhất</b>
            </h5>
            {this.show_lastest_prod()}
            {this.state.lastest_prod_page < 5 ? viewMoreLastestJSX : null}
          </div>
        )}

        {/* Hot product */}
        {this.state.hot_prod_arr.length === 0 ? null : (
          <div className="container bg-white p-3 mt-3">
            <h5 className="p-2">
              <b>Sản phẩm nổi bật</b>
            </h5>
            <div className="d-flex justify-content-center row px-2">
              {this.show_hot_prod()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Home);
