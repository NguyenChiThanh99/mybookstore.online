import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";

var timer6 = null;

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      err: ''
    };
  }

  componentWillUnmount() {
    clearTimeout(timer6);
  }

  onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value,
    });
  };

  login = () => {
    const {username, password} = this.state;
    if (username === 'admin' && password === 'admin') {
      this.props.history.push("/admin/dashboard");
    } else {
      this.setState({
        err: "Username or Password incorrect",
      });
      timer6 = setTimeout(() => this.setState({ err: "" }), 4000);
    }
  }

  render() {
    const errJSX = (
      <div className="alert alert-danger alert-dismissible fade show mb-4">
        {this.state.err}
      </div>
    );

    return (
      <div className="container">
        {/* Outer Row */}
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* Nested Row within Card Body */}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900">Login Here!</h1>
                      </div>
                      {this.state.err === '' ? null : errJSX}
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="text"
                            name="username"
                            className="form-control form-control-user"
                            placeholder="Enter Username"
                            id="username"
                            value={this.state.username}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            className="form-control form-control-user"
                            placeholder="Password"
                            id="password"
                            value={this.state.password}
                            onChange={this.onChange}
                          />
                        </div>
                        <button
                          onClick={this.login}
                          name="login_btn"
                          className="btn btn-danger btn-user btn-block"
                        >
                          Login
                        </button>
                        <hr />
                        <NavLink to='/'>
                          <b style={{ color: "#eb2b3f" }}>Về Trang Chủ</b>
                        </NavLink>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);