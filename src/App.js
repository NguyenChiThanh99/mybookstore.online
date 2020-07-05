import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ScrollToTop from "./Components/ScrollToTop";
import Header from '../src/Components/Header';
import Footer from '../src/Components/Footer';
import routes from './routes';

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
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>{this.showContent(routes)}</Switch>
            </Suspense>

            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}