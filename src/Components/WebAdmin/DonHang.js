import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";
import "../../CSS/webadmin.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default class DonHang extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
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
                  <Modal.Title>Xác nhận xóa đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Bạn có chắc muốn xóa đơn hàng #idididididididid khỏi database
                  ?
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
                  <h6 className="m-0 font-weight-bold text-danger">Đơn Hàng</h6>
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
                          <th>ID</th>
                          <th>Email</th>
                          <th>Tên Khách Hàng</th>
                          <th>Địa Chỉ</th>
                          <th>Số Điện Thoại</th>
                          <th>Ghi Chú</th>
                          <th>Hình Thức Thanh Toán</th>
                          <th>Tổng Tiền</th>
                          <th>Chi Tiết Đơn Hàng</th>
                          <th>EDIT</th>
                          <th>DELETE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-1">5efed0b77989540017a050bc</td>
                          <td className="p-1">17521049@gm.uit.edu.vn</td>
                          <td className="p-1">Nguyễn Chí Thanh</td>
                          <td className="p-1">
                            abc, Xã An Phú Tây, Huyện Bình Chánh, Hồ Chí Minh
                          </td>
                          <td className="p-1">1234999373</td>
                          <td className="p-1">Đây là ghi chú</td>
                          <td className="p-1">
                            Thanh toán tiền mặt khi nhận hàng
                          </td>
                          <td className="p-1">
                            {this.currencyFormat("791889")} đ
                          </td>
                          <td className="p-1">
                            <button
                              type="submit"
                              name="edithanoi_btn"
                              className="btn btn-success"
                            >
                              {" "}
                              SELECT
                            </button>
                          </td>
                          <td className="p-1">
                            <button
                              type="submit"
                              name="edithanoi_btn"
                              className="btn btn-primary"
                            >
                              {" "}
                              EDIT
                            </button>
                          </td>
                          <td className="p-1">
                            <button
                              onClick={this.handleShow}
                              type="submit"
                              name="deletehanoi_btn"
                              className="btn btn-danger"
                            >
                              {" "}
                              DELETE
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
