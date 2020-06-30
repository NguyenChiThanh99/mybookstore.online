/* eslint-disable react/style-prop-object */
import React, { Component } from 'react'

export default class FBicon extends Component {
    render() {
        return (
          <div>
            <a
              href="# "
              className="btn btn-primary btn-facebook"
              style={{ float: "right" }}
            >
              <div className="text-nowrap">
                <i className="fab fa-facebook-f"></i> Facebook
              </div>
            </a>
          </div>
        );
    }
}
