import React from "react";
// import ThanhToan from "./Components/ThanhToan";
// import GioHang from "./Components/GioHang";
// import NotFound from "./Components/NotFound";
// import ChiTietSanPham from "./Components/ChiTietSanPham";
// import DanhSachSanPham from "./Components/DanhSachSanPham";
// import Home from "./Components/Home";
// import Account from "./Components/Account";
// import HoaDon from "./Components/HoaDon";
// import LichSuGiaoDich from "./Components/LichSuGiaoDich";
// import Search from './Components/Search'

import Loadable from "react-loadable";

//const ThanhToan = React.lazy(() => import("./Components/ThanhToan"));
//const GioHang = React.lazy(() => import("./Components/GioHang"));
const NotFound = React.lazy(() => import("./Components/NotFound"));
const ChiTietSanPham = React.lazy(() => import("./Components/ChiTietSanPham"));
const DanhSachSanPham = React.lazy(() =>
  import("./Components/DanhSachSanPham")
);
//const Home = React.lazy(() => import("./Components/Home"));
//const Account = React.lazy(() => import("./Components/Account"));
const HoaDon = React.lazy(() => import("./Components/HoaDon"));
//const LichSuGiaoDich = React.lazy(() => import("./Components/LichSuGiaoDich"));
const Search = React.lazy(() => import("./Components/Search"));


const DynamicImport = (LoaderComponent) =>
  Loadable({
    loader: LoaderComponent,
    loading: () => null,
  });

const routes = [
  {
    path: "/",
    exact: true,
    //main: () => <Home />,
    main: DynamicImport(() => import("./Components/Home")),
  },
  {
    path: "/pay",
    exact: false,
    //main: () => <ThanhToan />,
    main: DynamicImport(() => import("./Components/ThanhToan")),
  },
  {
    path: "/cart",
    exact: false,
    //main: () => <GioHang />,
    main: DynamicImport(() => import("./Components/GioHang")),
  },
  {
    path: "/account",
    exact: false,
    //main: () => <Account />,
    main: DynamicImport(() => import("./Components/Account")),
  },
  {
    path: "/category/:slug",
    exact: false,
    main: ({ match }) => <DanhSachSanPham match={match} />,
  },
  {
    path: "/product/:slug/:idbill?/:iscomment?",
    exact: false,
    main: ({ match }) => <ChiTietSanPham match={match} />,
  },
  {
    path: "/bill/:slug",
    exact: false,
    main: ({ match }) => <HoaDon match={match} />,
  },
  {
    path: "/order-history",
    exact: false,
    //main: () => <LichSuGiaoDich />,
    main: DynamicImport(() => import("./Components/LichSuGiaoDich")),
  },
  {
    path: "/search/:search",
    exact: false,
    main: ({ match }) => <Search match={match} />,
  },
  {
    path: "",
    exact: false,
    main: ({ match }) => <NotFound match={match} />,
  },
];

export default routes;