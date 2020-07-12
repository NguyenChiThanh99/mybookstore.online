import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Global from "../Global";
import axios from "axios";
import qs from "qs";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";
import "../../CSS/webadmin.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

var timer7 = null;

export class ThemSach extends Component {
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
      gia: "",
      loaibia: "",
      sotrang: "",
      mota: "",
      err: '',
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

  componentWillUnmount() {
    clearTimeout(timer7);
  }

  addProduct = (event) => {
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
    
    const data = {
      tensp: tensp, tacgia: tacgia, tenurl: tenurl, nxb: nxb, namxb: namxb, kichthuoc: kichthuoc, nhacungcap: nhacungcap, hinhanhsanpham: hinhanhsanpham, gia: gia, loaibia: loaibia, sotrang: sotrang, mota: mota, urlloaisp: urlloaisp
    };
    const url = Global.link + "webadmin/adddata";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options).then((res) => {
      if (res.data.data === 'error') {
        this.setState({
          err: "Dữ liệu nhập vào không đúng, vui lòng kiểm tra lại.",
        });
        timer7 = setTimeout(() => this.setState({ err: "" }), 4000);
      } else {
        this.props.history.push("/admin/category/" + this.state.danhmuc);
      }
    });
  };

  showDropdown = () => {
    var result = null;
    var dataDropdown = [];
    if (this.state.danhmuc === "Văn học") {
      dataDropdown = [
        "Văn học/Tiểu thuyết",
        "Văn học/Truyện ngắn",
        "Văn học/Light Novel",
        "Văn học/Truyện trinh thám",
        "Văn học/Ngôn tình",
        "Văn học/Tác phẩm kinh điển",
        "Văn học/Huyền bí - Giả tưởng",
        "Văn học/Thơ ca, tục ngữ",
        "Văn học/Phóng sự, ký sự",
        "Văn học/Truyện tranh",
        "Văn học/12 cung hoàng đạo",
        "Văn học/Tuổi teen",
        "Văn học/Truyện cười",
        "Văn học/Sách ảnh",
        "Văn học/Du ký",
        "Văn học/Kinh dị",
      ];
    } else if (this.state.danhmuc === "Sách thiếu nhi") {
      dataDropdown = [
        "Sách thiếu nhi/Truyện thiếu nhi",
        "Sách thiếu nhi/Manga - Comic",
        "Sách thiếu nhi/Kiến thức bách khoa",
        "Sách thiếu nhi/Kỹ năng sống cho trẻ",
        "Sách thiếu nhi/Từ điển thiếu nhi",
        "Sách thiếu nhi/Flashcard",
        "Sách thiếu nhi/Tạp chí thiếu nhi",
        "Sách thiếu nhi/Sách nói",
        "Sách thiếu nhi/Tô màu, luyện chữ",
      ];
    } else if (this.state.danhmuc === "Kinh tế") {
      dataDropdown = [
        "Kinh tế/Quản trị - lãnh đạo",
        "Kinh tế/Marketing - bán hàng",
        "Kinh tế/Nhân vật - bài học kinh doanh",
        "Kinh tế/Phân tích kinh tế",
        "Kinh tế/Khởi nghiệp làm giàu",
        "Kinh tế/Tài chính- ngân hàng",
        "Kinh tế/Chứng khoáng - bất động sản",
        "Kinh tế/Nhân sự - việc làm",
        "Kinh tế/Ngoại thương",
        "Kinh tế/Kế toán - kiểm toán - thuế",
      ];
    } else if (this.state.danhmuc === "Tiểu sử - hồi ký") {
      dataDropdown = [
        "Tiểu sử - hồi ký/Câu chuyện cuộc đời",
        "Tiểu sử - hồi ký/Chính trị",
        "Tiểu sử - hồi ký/Lịch sử",
        "Tiểu sử - hồi ký/Kinh tế",
        "Tiểu sử - hồi ký/Thể thao",
      ];
    } else if (this.state.danhmuc === "Tâm lý - Kỹ năng sống") {
      dataDropdown = [
        "Tâm lý - Kỹ năng sống/Kỹ năng sống",
        "Tâm lý - Kỹ năng sống/Rèn luyện nhân cách",
        "Tâm lý - Kỹ năng sống/Tâm lý",
        "Tâm lý - Kỹ năng sống/Sách cho tuổi mới lớn",
        "Tâm lý - Kỹ năng sống/Hạt giống tâm hồn",
      ];
    } else if (this.state.danhmuc === "Sách giáo khoa - tham khảo") {
      dataDropdown = [
        "Sách giáo khoa - tham khảo/Cấp 1",
        "Sách giáo khoa - tham khảo/Cấp 2",
        "Sách giáo khoa - tham khảo/Cấp 3",
        "Sách giáo khoa - tham khảo/Đại học",
        "Sách giáo khoa - tham khảo/Mẫu giáo",
        "Sách giáo khoa - tham khảo/Luyện thi Đại học",
        "Sách giáo khoa - tham khảo/Sách giáo viên",
      ];
    } else if (this.state.danhmuc === "Nuôi dạy con") {
      dataDropdown = [
        "Nuôi dạy con/Cẩm nang làm cha mẹ",
        "Nuôi dạy con/Phát triển kỹ năng - trí tuệ cho trẻ",
        "Nuôi dạy con/Phương pháp giáo dục trẻ các nước",
        "Nuôi dạy con/Dinh dưỡng - Sức khỏe cho trẻ",
        "Nuôi dạy con/Dành cho mẹ bầu",
        "Nuôi dạy con/Giáo dục trẻ tuổi teen",
      ];
    } else if (this.state.danhmuc === "Sách ngoại ngữ") {
      dataDropdown = [
        "Sách ngoại ngữ/Tiếng Anh",
        "Sách ngoại ngữ/Tiếng Nhật",
        "Sách ngoại ngữ/Tiếng Trung",
        "Sách ngoại ngữ/Tiếng Hàn",
        "Sách ngoại ngữ/Tiếng Pháp",
        "Sách ngoại ngữ/Ngoại ngữ khác",
        "Sách ngoại ngữ/Tiếng Việt cho người nước ngoài",
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
    const errJSX = (
      <div className="alert alert-danger alert-dismissible fade show mb-4">
        {this.state.err}
      </div>
    );

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        className="text-decoration-none"
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

        <Dropdown.Menu className="dropdowm-scroll-admin">
          {this.showDropdown()}
        </Dropdown.Menu>
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
                    <div class="row">
                      <div class="col-sm-6 col-12">
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
                      </div>
                      <div class="col-sm-6 col-12">
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
                      </div>
                    </div>
                    {this.state.err === "" ? null : errJSX}
                    <NavLink
                      to={"/admin/category/" + this.state.danhmuc}
                      className="btn btn-danger mb-2"
                    >
                      Cancel
                    </NavLink>
                    &nbsp;
                    <button
                      onClick={this.addProduct}
                      type="submit"
                      name="updatebtn"
                      className="btn btn-primary mb-2"
                    >
                      Thêm Sách
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

export default withRouter(ThemSach);