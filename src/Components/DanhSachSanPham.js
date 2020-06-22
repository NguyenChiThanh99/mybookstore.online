import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Global from "./Global";
import axios from "axios";
import qs from "qs";

import "../CSS/danhsachsp.css";

export class DanhSachSanPham extends Component {
  constructor(props) {
    super(props);
    var { match } = this.props;
    this.state = {
      slug: match.params.slug,
      data: [],
    };
  }

  componentDidMount() {
    this.get_danh_muc();
  }

  goToCategory = (type) => {
    this.props.history.push("/category/" + type);
  };

  get_danh_muc_lon = (category) => {
    const data = {
      urlloaisp: category,
    };
    const url = Global.link + "/product/showproductparent";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.data !== "error") {
        this.setState({
          data: res.data.data,
        });
      }
    });
  };

  get_danh_muc_nho = (category) => {
    const data = {
      urlloaisp: category,
    };
    const url = Global.link + "/product/showproductchild";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.data !== "error") {
        this.setState({
          data: res.data.data,
        });
      }
    });
  };

  get_danh_muc = () => {
    if (this.state.slug.indexOf('|') !== -1) {
      var path = this.state.slug.split("|");
      this.get_danh_muc_nho(path[0] + '/' + path[1]);
    } else {
      this.get_danh_muc_lon(this.state.slug);
    }
  }

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
    console.log(this.state.data);
    var path = this.state.slug.split("|");
    return (
      <div>
        {/*Path*/}
        <div className="container py-2">
          <NavLink to="/">
            <p className="path float-left">Trang chủ /{"\u00A0"}</p>
          </NavLink>
          {this.state.slug.indexOf("|") !== -1 ? (
            <div>
              <p className="path float-left">
                {path[0]} /{"\u00A0"}
              </p>
              <p className="path textColor">{path[1]}</p>
            </div>
          ) : (
            <p className="path float-left textColor">
              {path[0]} /{"\u00A0"}
            </p>
          )}
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
                      Tâm lý - kỹ năng sống
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
                                      "Tâm lý - kỹ năng sống|Kỹ năng sống"
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
                                      "Tâm lý - kỹ năng sống|Rèn luyện nhân cách"
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
                                      "Tâm lý - kỹ năng sống|Tâm lý"
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
                                      "Tâm lý - kỹ năng sống|Sách cho tuổi mới lớn"
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
                                      "Tâm lý - kỹ năng sống|Hạt giống tâm hồn"
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

export default withRouter(DanhSachSanPham);
