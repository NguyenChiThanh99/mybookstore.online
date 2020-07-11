import React, { Component } from "react";
import "../CSS/style.css";
import MetaTags from "react-meta-tags";
import { NavLink, withRouter } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

export class NotFound extends Component {
  render() {
    return (
      <div>
        <Header />

        {/*Path*/}
        <div className="container py-2 px-0">
          <NavLink to="/">
            <p className="path float-left">Trang chủ /{"\u00A0"}</p>
          </NavLink>
          <p className="path textColor">404 - Trang không tìm thấy</p>
        </div>

        <div className="container bg-white p-3">
          <MetaTags>
            <title>404 - Trang không tìm thấy | mybookstore.online</title>
            <meta
              property="og:url"
              content={
                "https://mybookstore.online/" + this.props.match.params.slug
              }
            />
            <meta property="og:type" content="website" />
            <meta
              name="description"
              content="404 - Xin lỗi, mybookstore.online không thể tìm thấy trang bạn yêu cầu rồi!"
            />
            <meta
              property="og:title"
              content="404 - Trang không tìm thấy | mybookstore.online"
            />
            <meta
              property="og:image"
              content="https://uit-hotelbooking.000webhostapp.com/logo.png"
            />
          </MetaTags>

          <h3>404</h3>
          <h4>Xin lỗi, trang bạn đang tìm kiếm không tồn tại!</h4>
          <button
            onClick={() => {
              this.props.history.push("/");
            }}
            type="button"
            className="btn btn-outline-danger mybtn-outline text-nowrap mt-2"
          >
            Đi đến trang chủ
          </button>
        </div>

        <Footer />
      </div>
    );
  }
}

export default withRouter(NotFound);
