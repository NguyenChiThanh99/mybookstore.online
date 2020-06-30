import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ThanhToan from "./Components/ThanhToan";
import GioHang from "./Components/GioHang";
import NotFound from "./Components/NotFound";
import ChiTietSanPham from "./Components/ChiTietSanPham";
import DanhSachSanPham from "./Components/DanhSachSanPham";
import Home from "./Components/Home";
import Account from "./Components/Account";
import HoaDon from "./Components/HoaDon";
import LichSuGiaoDich from "./Components/LichSuGiaoDich";

export default class Routes_Sitemap extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={GioHang} />
        <Route path="/account" component={Account} />
        <Route path="/category/:slug" component={DanhSachSanPham} />
        <Route
          path="/product/:slug/:idbill?/:iscomment?"
          component={ChiTietSanPham}
        />
        <Route path="/bill/:slug" component={HoaDon} />
        <Route path="/order-history" component={LichSuGiaoDich} />
        <Route path="/pay" component={ThanhToan} />
        <Route path="" component={NotFound} />
      </BrowserRouter>
    );
  }
}
