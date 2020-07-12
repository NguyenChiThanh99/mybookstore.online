import React, { Component } from "react";
import Global from "../Global";
import axios from "axios";

import "../../CSS/sb-admin-2.min.css";
import "../../fontawesome-free-5.13.0-web/css/all.min.css";

import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       product: 0,
       order: 0,
       user: 0,
    }
  }

  componentDidMount = () => {
    this.getData();
  }

  getData = () => {
    const url = Global.link + "webadmin/showalldatacount";
    const options = {
      method: "GET",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
    };
    axios(options).then((res) => {
      this.setState({
        product: res.data.datacountproduct,
        order: res.data.datacountorder,
        user: res.data.datacountuser,
      });
    });
  }
  
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
              {/* Page Heading */}
              <div className="d-sm-flex align-items-center justify-content-between mb-3">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>
              {/* Content Row */}
              <div className="row">
                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="card border-left-danger shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                            TỔNG SỐ ĐẦU SÁCH
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <h1>{this.state.product}</h1>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-book-open fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="card border-left-danger shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                            TỔNG SỐ ĐƠN HÀNG
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <h1>{this.state.order}</h1>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-file-invoice fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pending Requests Card Example */}
                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="card border-left-danger shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                            TỔNG SỐ TÀI KHOẢN
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <h1>{this.state.user}</h1>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-user-alt fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
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
