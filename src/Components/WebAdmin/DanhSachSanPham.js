import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";
import "../../CSS/webadmin.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default class DanhSachSanPham extends Component {
  constructor(props) {
    super(props)
    var { match } = this.props;
    this.state = {
      showModal: false,
      danhmuc: match.params.danhmuc,
    };
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  delete = () => {}

  currencyFormat = (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  render() {
    const item = {
      tensp: "Nhà Lãnh Đạo Không Chức Danh",
      tacgia: "Robin Sharma",
      tenurl: "nha-lanh-dao-khong-chuc-danh",
      urlloaisp: "Kinh tế/Quản trị - lãnh đạo",
      nxb: "Nhà Xuất Bản Trẻ",
      namxb: "02-2017",
      kichthuoc: "13 x 20.5 cm",
      nhacungcap: "NXB Trẻ",
      hinhanhsanpham:
        "https://salt.tikicdn.com/cache/280x280/media/catalog/product//n/h/nhalanhdao.u2769.d20170307.t090846.484463.jpg",
      gia: 48000,
      loaibia: "Bìa mềm",
      sotrang: 270,
      mota:
        "Suốt hơn 15 năm, Robin Sharma đã thầm lặng chia sẻ với những công ty trong danh sách Fortune 500 và nhiều người siêu giàu khác một công thức thành công đã giúp ông trở thành một trong những nhà cố vấn lãnh đạo được theo đuổi nhiều nhất thế giới. Đây là lần đầu tiên Sharma công bố công thức độc quyền này với bạn, để bạn có thể đạt được những gì tốt nhất, đồng thời giúp tổ chức của bạn có thể có những bước đột phá đến một cấp độ thành công mới trong thời đại thiên biến vạn hóa như hiện nay.<br/>Bất kể bạn làm gì trong tổ chức và cuộc sống hiện tại của bạn như thế nào, một thực tế quan trọng duy nhất là bạn có khả năng thể hiện năng lực lãnh đạo. Cho dù sự nghiệp hiện tại của bạn đang ở đâu, bạn vẫn luôn cần phải thể hiện những khả năng tột đỉnh của mình. Cuốn sách này sẽ hướng dẫn bạn làm thế nào để khai thác tối đa khả năng đó, cũng như thay đổi cuộc sống và thế giới xung quanh bạn.",
    };
    return (
      <div id="wrapper">
        {/* Sidebar */}
        <Sidebar />
        {/* End of Sidebar */}

        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <Topbar />

            {/* Begin Page Content */}
            <div className="container-fluid">
              <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Xác nhận ngừng kinh doanh sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Bạn có chắc muốn ngừng kinh doanh cuốn Nhà Lãnh Đạo Không Chức
                  Danh ?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={this.delete}>
                    Ngừng Kinh Doanh
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* DataTales Example */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-danger">
                    Sách {this.state.danhmuc} &nbsp;
                    <NavLink
                      to={"/admin/addproduct/" + this.state.danhmuc}
                      type="button"
                      className="btn btn-danger"
                    >
                      Thêm Sách
                    </NavLink>
                  </h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing={0}
                    >
                      <thead>
                        <tr>
                          <th>Tên Sách</th>
                          <th>Hình Ảnh</th>
                          <th>Tác Giả</th>
                          <th>Slug</th>
                          <th>URL Loại Sách</th>
                          <th>Nhà Xuất Bản</th>
                          <th>Năm Xuất Bản</th>
                          <th>Kích Thước</th>
                          <th>Nhà Cung Cấp</th>
                          <th>Giá</th>
                          <th>Loại Bìa</th>
                          <th>Số Trang</th>
                          <th>Mô Tả</th>
                          <th>Edit</th>
                          <th>Ngừng Kinh Doanh?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-1">{item.tensp}</td>
                          <td className="p-1">
                            <img
                              src={item.hinhanhsanpham}
                              className="img-fluid"
                              style={{ width: "250px" }}
                              alt="Nhà Lãnh Đạo Không Chức Danh"
                            />
                          </td>
                          <td className="p-1">{item.tacgia}</td>
                          <td className="p-1">{item.tenurl}</td>
                          <td className="p-1">{item.urlloaisp}</td>
                          <td className="p-1">{item.nxb}</td>
                          <td className="p-1">{item.namxb}</td>
                          <td className="p-1">{item.kichthuoc}</td>
                          <td className="p-1">{item.nhacungcap}</td>
                          <td className="p-1">
                            {this.currencyFormat(item.gia.toString())} đ
                          </td>
                          <td className="p-1">{item.loaibia}</td>
                          <td className="p-1">{item.sotrang}</td>
                          <td className="p-1">
                            <p
                              className="mota mb-0 text-justify"
                              style={{ width: "400px" }}
                            >
                              {item.mota}
                            </p>
                          </td>
                          <td>
                            <NavLink
                              to={{
                                pathname:
                                  "/admin/editproduct/" + this.state.danhmuc,
                                state: { data: item },
                              }}
                              type="submit"
                              name="edithanoi_btn"
                              className="btn btn-primary"
                            >
                              {" "}
                              Edit
                            </NavLink>
                          </td>
                          <td>
                            <button
                              onClick={this.handleShow}
                              type="submit"
                              name="deletehanoi_btn"
                              className="btn btn-danger"
                            >
                              {" "}
                              Yes
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
      </div>
    );
  }
}
