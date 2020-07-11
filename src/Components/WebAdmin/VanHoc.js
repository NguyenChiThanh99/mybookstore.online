import React, { Component } from "react";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";
import "../../CSS/webadmin.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default class VanHoc extends Component {
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
              {/* DataTales Example */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-danger">
                    Sách Văn học &nbsp;
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-toggle="modal"
                      data-target="#hotelhanoi"
                    >
                      Thêm sách Văn học
                    </button>
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
                          <th>ID</th>
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
                          <th>EDIT</th>
                          <th>DELETE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>5f01a3d19426d3001742ddc3</td>
                          <td>Nhà Lãnh Đạo Không Chức Danh</td>
                          <td>
                            <img
                              src="https://salt.tikicdn.com/cache/280x280/media/catalog/product//n/h/nhalanhdao.u2769.d20170307.t090846.484463.jpg"
                              className="img-fluid"
                              style={{ width: "70px" }}
                              alt="Nhà Lãnh Đạo Không Chức Danh"
                            />
                          </td>
                          <td>Robin Sharma</td>
                          <td>nha-lanh-dao-khong-chuc-danh</td>
                          <td>Kinh tế/Quản trị - lãnh đạo</td>
                          <td>Nhà Xuất Bản Trẻ</td>
                          <td>02-2017</td>
                          <td>13 x 20.5 cm</td>
                          <td>NXB Trẻ</td>
                          <td>{this.currencyFormat("48000")} đ</td>
                          <td>Bìa mềm</td>
                          <td>270</td>
                          <td>
                            <p className='mota'>
                              Suốt hơn 15 năm, Robin Sharma đã thầm lặng chia sẻ
                              với những công ty trong danh sách Fortune 500 và
                              nhiều người siêu giàu khác một công thức thành
                              công đã giúp ông trở thành một trong những nhà cố
                              vấn lãnh đạo được theo đuổi nhiều nhất thế giới.
                              Đây là lần đầu tiên Sharma công bố công thức độc
                              quyền này với bạn, để bạn có thể đạt được những gì
                              tốt nhất, đồng thời giúp tổ chức của bạn có thể có
                              những bước đột phá đến một cấp độ thành công mới
                              trong thời đại thiên biến vạn hóa như hiện nay.
                              <br />
                              Bất kể bạn làm gì trong tổ chức và cuộc sống hiện
                              tại của bạn như thế nào, một thực tế quan trọng
                              duy nhất là bạn có khả năng thể hiện năng lực lãnh
                              đạo. Cho dù sự nghiệp hiện tại của bạn đang ở đâu,
                              bạn vẫn luôn cần phải thể hiện những khả năng tột
                              đỉnh của mình. Cuốn sách này sẽ hướng dẫn bạn làm
                              thế nào để khai thác tối đa khả năng đó, cũng như
                              thay đổi cuộc sống và thế giới xung quanh bạn.
                            </p>
                          </td>
                          <td>
                            <form action="hanoi_edit.php" method="post">
                              <input
                                type="hidden"
                                name="edit_id"
                                defaultValue="<?php echo $row['id'];  ?>"
                              />
                              <button
                                type="submit"
                                name="edithanoi_btn"
                                className="btn btn-success"
                              >
                                {" "}
                                EDIT
                              </button>
                            </form>
                          </td>
                          <td>
                            <form action="code.php" method="post">
                              <input
                                type="hidden"
                                name="delete_id"
                                defaultValue="<?php echo $row['id'];  ?>"
                              />
                              <button
                                type="submit"
                                name="deletehanoi_btn"
                                className="btn btn-danger"
                              >
                                {" "}
                                DELETE
                              </button>
                            </form>
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
