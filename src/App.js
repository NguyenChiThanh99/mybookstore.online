import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./CSS/style.css";
import "./CSS/mystyle.css";

import routes from "./routes";
const Header = React.lazy(() => import("./Components/Header"));
const Footer = React.lazy(() => import("./Components/Footer"));
const ScrollToTop = React.lazy(() => import("./Components/ScrollToTop"));

export default class App extends Component {
  showContent = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index} path={route.path} component={route.main} exact={route.exact} />;
      });
    }
    return result;
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="container-fluid background2 px-0">
            <Header />

            {/* Main */}
            <Suspense
              fallback={
                <div>
                  <img
                    src={require("./images/loading.gif")}
                    alt="loading"
                    width="200px"
                  />
                </div>
              }
            >
              <Switch>{this.showContent(routes)}</Switch>
            </Suspense>

            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}