import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";
import "../../CSS/webadmin.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default class ChiTietDonHAng extends Component {
  constructor(props) {
    super(props)
    var { match } = this.props;
    this.state = {
      showModal: false,
      order: match.params.order,
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
    var item = {
      _id: 0,
      ten: "Đừng Chết Ở Ả Rập Xê Út",
      hinhanhsanpham:
        "https://salt.tikicdn.com/cache/280x280/ts/product/49/3b/7b/53b204d12d9579fa628aed08d10033de.jpg",
      gia: 99000,
      soluongsanpham: 2,
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
                  <Modal.Title>Xác nhận xóa chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Bạn có chắc muốn xóa cuốn {item.ten} khỏi đơn hàng ?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={this.delete}>
                    Xóa
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* DataTales Example */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-danger">
                    Chi Tiết Đơn Hàng #{this.state.order}
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
                          <th>Giá</th>
                          <th>Số Lượng</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-1">{item.ten}</td>
                          <td className="p-1">
                            <img
                              src={item.hinhanhsanpham}
                              className="img-fluid"
                              style={{ width: "250px" }}
                              alt={item.tensp}
                            />
                          </td>
                          <td className="p-1">
                            {this.currencyFormat(item.gia.toString())} đ
                          </td>
                          <td className="p-1">{item.soluongsanpham}</td>
                          <td>
                            <NavLink
                              to={{
                                pathname: "/admin/editorderdetail",
                                state: {
                                  data: item,
                                  order: this.state.order,
                                },
                              }}
                              type="submit"
                              name="edit"
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
                              Delete
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
