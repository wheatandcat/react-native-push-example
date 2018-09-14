import React, { Component } from "react";
import { start as notification } from "../lib/notification";

export default class extends Component {
  componentDidMount() {
    if (!this.props.first) {
      return;
    }

    notification(this.receiveData);
  }

  receiveData = data => {};

  render() {
    return this.props.children;
  }
}
