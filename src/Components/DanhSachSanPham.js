import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Global from "./Global";
import axios from "axios";
import qs from "qs";
import MetaTags from "react-meta-tags";

import "../CSS/danhsachsp.css";
import "../CSS/style.css";

export class DanhSachSanPham extends Component {
  constructor(props) {
    super(props);
    var { match } = this.props;
    this.state = {
      slug: match.params.slug,
      dataFull: [],
      childData: [],
      numOfPage: 0,
      page: 1,
      loading: true,
    };
  }

  componentDidMount() {
    this.get_danh_muc(this.state.slug);
  }

  goToCategory = (type) => {
    this.props.history.push("/category/" + type);
    this.setState({ slug: type, page: 1, loading: true });
    this.get_danh_muc(type);
  };

  get_danh_muc_lon = (category) => {
    const data = {
      urlloaisp: category,
    };
    const url = Global.link + "product/showproductparent";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.data !== "error") {
        this.setState({
          loading: false,
          dataFull: res.data.data,
          childData: res.data.data.slice(0, 12),
        });
        this.numOfPage(res.data.data);
      }
    });
  };

  get_danh_muc_nho = (category) => {
    const data = {
      urlloaisp: category,
    };
    const url = Global.link + "product/showproductchild";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.data !== "error") {
        this.setState({
          loading: false,
          dataFull: res.data.data,
          childData: res.data.data.slice(0, 12),
        });
        this.numOfPage(res.data.data);
      }
    });
  };

  get_danh_muc = (slug) => {
    if (slug.indexOf("|") !== -1) {
      var path = slug.split("|");
      this.get_danh_muc_nho(path[0] + "/" + path[1]);
    } else {
      this.get_danh_muc_lon(slug);
    }
  };

  numOfPage = (dataFull) => {
    var lengthData = dataFull.length;
    if (lengthData !== 0) {
      if (lengthData % 12 === 0) {
        this.setState({
          numOfPage: Math.floor(lengthData / 12),
        });
      } else {
        this.setState({
          numOfPage: Math.floor(lengthData / 12) + 1,
        });
      }
    }
  };

  currencyFormat = (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  show_4_prod = (arr_4_prod) => {
    var result = null;
    result = arr_4_prod.map((product, index) => {
      return (
        <div className="col-sm-3 col-6 product_shadow my-2">
          <NavLink to={"/product/" + product.tenurl} key={index}>
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
    return result;
  };

  showButtonPage = () => {
    var page_arr = [];
    for (var i = 0; i < this.state.numOfPage; i++) {
      page_arr.push(i);
    }
    var result = null;
    if (this.state.dataFull.length > 0) {
      result = page_arr.map((page, index) => {
        return (
          <button
            type="button"
            class={
              this.state.page === page + 1
                ? "btn btn-danger"
                : "btn btn-secondary"
            }
            onClick={() => {
              this.changePage(page + 1);
            }}
          >
            {page + 1}
          </button>
        );
      });
    }
    return result;
  };

  changePage = (page) => {
    var start = (page - 1) * 12;
    this.setState({
      page: page,
      childData: this.state.dataFull.slice(start, start + 12),
    });
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  render() {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a className="row m-0" href="# " ref={ref}>
        <div
          className="nav-link list-item flex-fill"
          onClick={(e) => {
            this.goToCategory(children);
          }}
        >
          {children}
        </div>
        <button
          className="btn dropdown-toggle dropdown-toggle-split mybtn-dropright list-item"
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        />
      </a>
    ));

    const PageJSX = (
      <div className="d-flex justify-content-center">
        <div
          class="btn-group mr-2 pb-2 mt-2"
          role="group"
          aria-label="First group"
        >
          {this.showButtonPage()}
        </div>
      </div>
    );

    const loadingJSX = (
      <div className="p-3 d-flex justify-content-center">
        <img
          src={require("../images/loading.gif")}
          className="img-fluid align-self-center"
          alt="loading"
          width="150px"
        />
      </div>
    );

    const bodyJSX = (
      <div>
        <div className="row mx-0 px-2">
          {this.show_4_prod(this.state.childData.slice(0, 4))}
        </div>
        <div className="row mx-0 px-2">
          {this.show_4_prod(this.state.childData.slice(4, 8))}
        </div>
        <div className="row mx-0 px-2">
          {this.show_4_prod(this.state.childData.slice(8, 12))}
        </div>
        {this.state.dataFull.length !== 0 ? PageJSX : null}
      </div>
    );

    var path = this.state.slug.split("|");
    var title = "";
    if (this.state.slug.indexOf("|") !== -1) {
      title = path[1];
    } else {
      title = path[0];
    }

    var firstItemImg = "https://uit-hotelbooking.000webhostapp.com/logo.png";
    if (this.state.dataFull.length !== 0) {
      firstItemImg = this.state.dataFull[0].hinhanhsanpham;
    }

    return (
      <div>
        <MetaTags>
          <title>
            {"Tổng hợp sách " + title + " hay và mới nhất | mybookstore.online"}
          </title>
          <meta
            property="og:url"
            content={"https://mybookstore.online/category/" + this.state.slug}
          />
          <meta property="og:type" content="website" />
          <meta
            name="description"
            content={
              "Hàng ngàn mặt hàng sách " +
              title +
              " tại mybookstore.online, với ưu đãi hàng ngày lên đến 50%, giao hàng miễn phí trên toàn quốc chỉ từ 120k. Mua ngay!"
            }
          />
          <meta
            property="og:title"
            content={
              "Tổng hợp sách " + title + " hay và mới nhất | mybookstore.online"
            }
          />
          <meta property="og:image" content={firstItemImg} />
        </MetaTags>

        {/*Path*/}
        <div className="container pt-2 pb-2">
          <NavLink to="/">
            <p className="path float-left">Trang chủ /{"\u00A0"}</p>
          </NavLink>
          {this.state.slug.indexOf("|") !== -1 ? (
            <div>
              <a href="# ">
                <p
                  className="path float-left"
                  onClick={(e) => {
                    this.goToCategory(path[0]);
                  }}
                >
                  {path[0]} /{"\u00A0"}
                </p>
              </a>
              <a href="# ">
                <p
                  className="path textColor"
                  onClick={(e) => {
                    this.goToCategory(this.state.slug);
                  }}
                >
                  {path[1]}
                </p>
              </a>
            </div>
          ) : (
            <a href="# ">
              <p
                className="path textColor"
                onClick={(e) => {
                  this.goToCategory(path[0]);
                }}
              >
                {path[0]}
              </p>
            </a>
          )}
        </div>

        {/*Main*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              {/*Danh muc*/}

              <div className="bg-white">
                <div className="list">
                  <span>Danh mục sản phẩm</span>
                </div>
                <nav className="nav flex-column">
                  <Dropdown drop="right">
                    <Dropdown.Toggle as={CustomToggle}>Văn học</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="p-0 bg-white">
                        <table className="table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory("Văn học|Tiểu thuyết");
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Tiểu thuyết
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory("Văn học|Truyện ngắn");
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Truyện ngắn
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory("Văn học|Light Novel");
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Light Novel
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Văn học|Truyện trinh thám"
                                    );
                                  }}
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
                                  onClick={() => {
                                    this.goToCategory("Văn học|Ngôn tình");
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Ngôn tình
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Văn học|Tác phẩm kinh điển"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Tác phẩm kinh điển
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Văn học|Huyền bí - Giả tưởng"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Huyền bí - Giả tưởng
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Văn học|Thơ ca, tục ngữ"
                                    );
                                  }}
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
                                  onClick={() => {
                                    this.goToCategory(
                                      "Văn học|Phóng sự, ký sự"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Phóng sự, ký sự
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory("Văn học|Truyện tranh");
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Truyện tranh
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Văn học|12 cung hoàng đạo"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  12 cung hoàng đạo
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory("Văn học|Tuổi teen");
                                  }}
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
                                  onClick={() => {
                                    this.goToCategory("Văn học|Truyện cười");
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Truyện cười
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory("Văn học|Sách ảnh");
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Sách ảnh
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory("Văn học|Du ký");
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Du ký
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory("Văn học|Kinh dị");
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Kinh dị
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
                      Sách thiếu nhi
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
                                      "Sách thiếu nhi|Truyện thiếu nhi"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Truyện thiếu nhi
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách thiếu nhi|Manga - Comic"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Manga - Comic
                                </a>
                              </td>
                              <td>
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
                              </td>
                              <td>
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
                              </td>
                            </tr>
                            <tr>
                              <td>
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
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách thiếu nhi|Flashcard"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Flashcard
                                </a>
                              </td>
                              <td>
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
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Sách thiếu nhi|Sách nói"
                                    );
                                  }}
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
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown drop="right">
                    <Dropdown.Toggle as={CustomToggle}>Kinh tế</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="p-0 bg-white">
                        <table className="table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Kinh tế|Quản trị - lãnh đạo"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Quản trị - lãnh đạo
                                </a>
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Kinh tế|Marketing - bán hàng"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Marketing - bán hàng
                                </a>
                              </td>
                              <td>
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
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Kinh tế|Phân tích kinh tế"
                                    );
                                  }}
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
                                  onClick={() => {
                                    this.goToCategory(
                                      "Kinh tế|Khởi nghiệp làm giàu"
                                    );
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Khởi nghiệp làm giàu
                                </a>
                              </td>
                              <td>
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
                              </td>
                              <td>
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
                              </td>
                              <td>
                                <a
                                  onClick={() => {
                                    this.goToCategory(
                                      "Kinh tế|Nhân sự - việc làm"
                                    );
                                  }}
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
                                  onClick={() => {
                                    this.goToCategory("Kinh tế|Ngoại thương");
                                  }}
                                  className="nav-link text-dark text-nowrap mya-dropright"
                                  href="# "
                                >
                                  Ngoại thương
                                </a>
                              </td>
                              <td>
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
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Dropdown.Item>
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

              {/*Price*/}
              <div className="bg-white mb-3">
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
            <div className="col-sm-9 px-0">
              <div className="bg-white">
                {this.state.loading ? loadingJSX : bodyJSX}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DanhSachSanPham);
