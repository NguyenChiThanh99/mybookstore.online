import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Global from "../Global";
import axios from "axios";
import qs from "qs";

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
      data: [],
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    const data = {
      id: this.state.order,
    };
    const url = Global.link + "webadmin/chitietdonhang";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      console.log(res.data.data);
    });
  };

  // show_data = () => {
  //   var result = null;
  //   if (this.state.data.length > 0) {
  //     result = this.state.data.map((item, index) => {
  //       return (
  //         <tr key={index}>
  //           <td className="p-1">
  //             #{item._id.slice(0, 12) + " " + item._id.slice(12, 24)}
  //           </td>
  //           <td className="p-1">{item.email}</td>
  //           <td className="p-1">{item.ten}</td>
  //           <td className="p-1">{item.diachi}</td>
  //           <td className="p-1">{item.dienthoai}</td>
  //           <td className="p-1">{item.ghichu}</td>
  //           <td className="p-1">{item.thanhtoan}</td>
  //           <td className="p-1">{item.trangthai}</td>
  //           <td className="p-1">
  //             {this.currencyFormat(item.tongtien.toString())} đ
  //           </td>
  //           <td>
  //             <NavLink
  //               to={"/admin/orderdetail/" + item._id}
  //               type="submit"
  //               name="select-btn"
  //               className="btn btn-success"
  //             >
  //               {" "}
  //               Select
  //             </NavLink>
  //           </td>
  //           <td>
  //             <NavLink
  //               to={{
  //                 pathname: "/admin/editorder",
  //                 state: {
  //                   data: item,
  //                 },
  //               }}
  //               type="submit"
  //               name="edit"
  //               className="btn btn-primary"
  //             >
  //               {" "}
  //               Edit
  //             </NavLink>
  //           </td>
  //           <td>
  //             <button
  //               onClick={() => {
  //                 this.handleShow();
  //                 this.setState({ idOrder: item._id });
  //               }}
  //               type="submit"
  //               name="deletehanoi_btn"
  //               className="btn btn-danger"
  //             >
  //               {" "}
  //               Delete
  //             </button>
  //           </td>
  //         </tr>
  //       );
  //     });
  //   }
  //   return result;
  // };

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
                              style={{ width: "150px" }}
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
