import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";
import "../../CSS/webadmin.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    var { match } = this.props;
    this.state = {
      danhmuc: match.params.danhmuc,
      tensp: "",
      tacgia: "",
      tenurl: "",
      urlloaisp: "Vui lòng chọn...",
      nxb: "",
      namxb: "",
      kichthuoc: "",
      nhacungcap: "",
      hinhanhsanpham: "",
      gia: 0,
      loaibia: "",
      sotrang: 0,
      mota: "",
    };
  }

  onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value,
    });
  };

  update = (event) => {
    event.preventDefault();
    const {
      tensp,
      tacgia,
      tenurl,
      urlloaisp,
      nxb,
      namxb,
      kichthuoc,
      nhacungcap,
      hinhanhsanpham,
      gia,
      loaibia,
      sotrang,
      mota,
    } = this.state;
    console.log(
      tensp,
      tacgia,
      tenurl,
      urlloaisp,
      nxb,
      namxb,
      kichthuoc,
      nhacungcap,
      hinhanhsanpham,
      gia,
      loaibia,
      sotrang,
      mota
    );
  };

  showDropdown = () => {
    var result = null;
    var dataDropdown = [];
    if (this.state.danhmuc === "Văn học") {
      dataDropdown = [
        "Tiểu thuyết",
        "Truyện ngắn",
        "Light Novel",
        "Truyện trinh thám",
        "Ngôn tình",
        "Tác phẩm kinh điển",
        "Huyền bí - Giả tưởng",
        "Thơ ca, tục ngữ",
        "Phóng sự, ký sự",
        "Truyện tranh",
        "12 cung hoàng đạo",
        "Tuổi teen",
        "Truyện cười",
        "Sách ảnh",
        "Du ký",
        "Kinh dị",
      ];
    } else if (this.state.danhmuc === "Sách thiếu nhi") {
      dataDropdown = [
        "Truyện thiếu nhi",
        "Manga - Comic",
        "Kiến thức bách khoa",
        "Kỹ năng sống cho trẻ",
        "Từ điển thiếu nhi",
        "Flashcard",
        "Tạp chí thiếu nhi",
        "Sách nói",
        "Tô màu, luyện chữ",
      ];
    } else if (this.state.danhmuc === "Kinh tế") {
      dataDropdown = [
        "Quản trị - lãnh đạo",
        "Marketing - bán hàng",
        "Nhân vật - bài học kinh doanh",
        "Phân tích kinh tế",
        "Khởi nghiệp làm giàu",
        "Tài chính- ngân hàng",
        "Chứng khoáng - bất động sản",
        "Nhân sự - việc làm",
        "Ngoại thương",
        "Kế toán - kiểm toán - thuế",
      ];
    } else if (this.state.danhmuc === "Tiểu sử - hồi ký") {
      dataDropdown = [
        "Câu chuyện cuộc đời",
        "Chính trị",
        "Lịch sử",
        "Kinh tế",
        "Thể thao",
      ];
    } else if (this.state.danhmuc === "Tâm lý - Kỹ năng sống") {
      dataDropdown = [
        "Kỹ năng sống",
        "Rèn luyện nhân cách",
        "Tâm lý",
        "Sách cho tuổi mới lớn",
        "Hạt giống tâm hồn",
      ];
    } else if (this.state.danhmuc === "Sách giáo khoa - tham khảo") {
      dataDropdown = [
        "Cấp 1",
        "Cấp 2",
        "Cấp 3",
        "Đại học",
        "Mẫu giáo",
        "Luyện thi Đại học",
        "Sách giáo viên",
      ];
    } else if (this.state.danhmuc === "Nuôi dạy con") {
      dataDropdown = [
        "Cẩm nang làm cha mẹ",
        "Phát triển kỹ năng - trí tuệ cho trẻ",
        "Phương pháp giáo dục trẻ các nước",
        "Dinh dưỡng - Sức khỏe cho trẻ",
        "Dành cho mẹ bầu",
        "Giáo dục trẻ tuổi teen",
      ];
    } else if (this.state.danhmuc === "Sách ngoại ngữ") {
      dataDropdown = [
        "Tiếng Anh",
        "Tiếng Nhật",
        "Tiếng Trung",
        "Tiếng Hàn",
        "Tiếng Pháp",
        "Ngoại ngữ khác",
        "Tiếng Việt cho người nước ngoài",
      ];
    }

    if (dataDropdown.length !== 0) {
      result = dataDropdown.map((item, index) => {
        return (
          <Dropdown.Item
            key={index}
            className="mydropdown-item account_active_dropdown"
            onSelect={() => {
              this.setState({
                urlloaisp: item,
              });
            }}
          >
            {item}
          </Dropdown.Item>
        );
      });
    } else {
      return null;
    }
    return result;
  };

  render() {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href="# "
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <div className="form-control">{children}</div>
      </a>
    ));

    const URLLoaiSachDropdown = (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {this.state.urlloaisp}
        </Dropdown.Toggle>

        {this.state.districtArr.length === 0 ? null : (
          <Dropdown.Menu className="dropdowm-scroll">
            {this.showDropdown()}
          </Dropdown.Menu>
        )}
      </Dropdown>
    );

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
                    Thêm sách {this.state.danhmuc}
                  </h6>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label> Tên Sách </label>
                      <input
                        placeholder="VD: Nhà Lãnh Đạo Không Chức Danh"
                        type="text"
                        className="form-control"
                        id="tensp"
                        name="tensp"
                        value={this.state.tensp}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Tác Giả </label>
                      <input
                        placeholder="VD: Robin Sharma"
                        type="text"
                        className="form-control"
                        id="tacgia"
                        name="tacgia"
                        value={this.state.tacgia}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Slug </label>
                      <input
                        placeholder="VD: nha-lanh-dao-khong-chuc-danh"
                        type="text"
                        className="form-control"
                        id="tenurl"
                        name="tenurl"
                        value={this.state.tenurl}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> URL Loại Sách </label>
                      {URLLoaiSachDropdown}
                    </div>
                    <div className="form-group">
                      <label> Nhà Xuất Bản </label>
                      <input
                        placeholder="VD: Nhà Xuất Bản Trẻ"
                        type="text"
                        className="form-control"
                        id="nxb"
                        name="nxb"
                        value={this.state.nxb}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Năm Xuất Bản </label>
                      <input
                        placeholder="VD: 02-2017"
                        type="text"
                        className="form-control"
                        id="namxb"
                        name="namxb"
                        value={this.state.namxb}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Kích Thước </label>
                      <input
                        placeholder="VD: 13 x 20.5 cm"
                        type="text"
                        className="form-control"
                        id="kichthuoc"
                        name="kichthuoc"
                        value={this.state.kichthuoc}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Nhà Cung Cấp </label>
                      <input
                        placeholder="VD: NXB Trẻ"
                        type="text"
                        className="form-control"
                        id="nhacungcap"
                        name="nhacungcap"
                        value={this.state.nhacungcap}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Hình Ảnh </label>
                      <input
                        placeholder="VD: https://salt.tikicdn.com/cache/280x280/media/catalog/product//n/h/nhalanhdao.u2769.d20170307.t090846.484463.jpg"
                        type="text"
                        className="form-control"
                        id="hinhanhsanpham"
                        name="hinhanhsanpham"
                        value={this.state.hinhanhsanpham}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Giá </label>
                      <input
                        placeholder="VD: 48000"
                        type="number"
                        className="form-control"
                        id="gia"
                        name="gia"
                        value={this.state.gia}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Loại Bìa </label>
                      <input
                        placeholder="VD: Bìa mềm"
                        type="text"
                        className="form-control"
                        id="loaibia"
                        name="loaibia"
                        value={this.state.loaibia}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Số Trang </label>
                      <input
                        placeholder="VD: 270"
                        type="number"
                        className="form-control"
                        id="sotrang"
                        name="sotrang"
                        value={this.state.sotrang}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label> Mô tả </label>
                      <textarea
                        placeholder="VD: Suốt hơn 15 năm, Robin Sharma đã thầm lặng chia sẻ với những công ty trong danh sách Fortune 500 và nhiều người siêu giàu khác một công thức thành công đã giúp ông trở thành một trong những nhà cố vấn lãnh đạo được theo đuổi nhiều nhất thế giới."
                        type="text"
                        className="form-control"
                        id="mota"
                        name="mota"
                        value={this.state.mota}
                        onChange={this.onChange}
                      />
                    </div>
                    <NavLink
                      to={"/admin/category/" + this.state.danhmuc}
                      className="btn btn-danger"
                    >
                      CANCEL
                    </NavLink>
                    &nbsp;
                    <button
                      onClick={this.update}
                      type="submit"
                      name="updatebtn"
                      className="btn btn-primary"
                    >
                      THÊM SÁCH
                    </button>
                  </form>
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
