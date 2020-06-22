import React from "react";
import ThanhToan from "./Components/ThanhToan";
import GioHang from "./Components/GioHang";
import NotFound from "./Components/NotFound";
import ChiTietSanPham from "./Components/ChiTietSanPham";
import DanhSachSanPham from "./Components/DanhSachSanPham";
import Home from "./Components/Home";
import Account from "./Components/Account";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/pay",
    exact: false,
    main: () => <ThanhToan />,
  },
  {
    path: "/cart",
    exact: false,
    main: () => <GioHang />,
  },
  {
    path: "/account",
    exact: false,
    main: () => <Account />,
  },
  {
    path: "/category/:slug",
    exact: false,
    main: ({ match }) => <DanhSachSanPham match={match} />,
  },
  {
    path: "/product/:slug",
    exact: false,
    main: ({ match }) => <ChiTietSanPham match={match} />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;