import React from "react";
import Loadable from "react-loadable";

const NotFound = React.lazy(() => import("./Components/NotFound"));
const ChiTietSanPham = React.lazy(() => import("./Components/ChiTietSanPham"));
const DanhSachSanPham = React.lazy(() =>
  import("./Components/DanhSachSanPham")
);
const HoaDon = React.lazy(() => import("./Components/HoaDon"));
const Search = React.lazy(() => import("./Components/Search"));

//-----------------------Web Admin-------------------------//
const AdminDanhSachSP = React.lazy(() => import("./Components/WebAdmin/DanhSachSanPham"));
const AdminThemSach = React.lazy(() =>
  import("./Components/WebAdmin/ThemSach")
);
const AdminEditSach = React.lazy(() =>
  import("./Components/WebAdmin/EditSach")
);
const AdminEditDonHang = React.lazy(() =>
  import("./Components/WebAdmin/EditDonHang")
);
const AdminChiTietDonHang = React.lazy(() =>
  import("./Components/WebAdmin/ChiTietDonHang")
);

const loadingJSX = (
  <div className="bg-white d-flex justify-content-center">
    <img
      src={require("./images/loading.gif")}
      className="img-fluid align-self-center"
      alt="loading"
      width="200px"
    />
  </div>
);

const DynamicImport = (LoaderComponent) =>
  Loadable({
    loader: LoaderComponent,
    loading: () => loadingJSX,
  });

const routes = [
  {
    path: "/",
    exact: true,
    main: DynamicImport(() => import("./Components/Home")),
  },
  {
    path: "/pay",
    exact: false,
    main: DynamicImport(() => import("./Components/ThanhToan")),
  },
  {
    path: "/cart",
    exact: false,
    main: DynamicImport(() => import("./Components/GioHang")),
  },
  {
    path: "/account",
    exact: false,
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
    main: DynamicImport(() => import("./Components/LichSuGiaoDich")),
  },
  {
    path: "/search/:search",
    exact: false,
    main: ({ match }) => <Search match={match} />,
  },

  //-----------------------Web Admin-------------------------//
  {
    path: "/admin",
    exact: true,
    main: DynamicImport(() => import("./Components/WebAdmin/Login")),
  },
  {
    path: "/admin/dashboard",
    exact: false,
    main: DynamicImport(() => import("./Components/WebAdmin/Dashboard")),
  },
  {
    path: "/admin/category/:danhmuc",
    exact: false,
    main: ({ match }) => <AdminDanhSachSP match={match} />,
  },
  {
    path: "/admin/addproduct/:danhmuc",
    exact: false,
    main: ({ match }) => <AdminThemSach match={match} />,
  },
  {
    path: "/admin/editproduct",
    exact: false,
    main: ({ location }) => <AdminEditSach location={location} />,
  },
  {
    path: "/admin/order",
    exact: false,
    main: DynamicImport(() => import("./Components/WebAdmin/DonHang")),
  },
  {
    path: "/admin/editorder",
    exact: false,
    main: ({ location }) => <AdminEditDonHang location={location} />,
  },
  {
    path: "/admin/orderdetail/:order",
    exact: false,
    main: ({ match }) => <AdminChiTietDonHang match={match} />,
  },
  {
    path: "",
    exact: false,
    main: ({ match }) => <NotFound match={match} />,
  },
];

export default routes;