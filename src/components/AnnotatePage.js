import React, { Component } from "react";
import Header from "./Header";
import LabelViewContainer from "../containers/LabelViewContainer";
import "../styles/Annotate.css";

class AnnotatePage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="AnnotatePage">
        {this.props.showHeader === true && <Header />}
        <LabelViewContainer
          imageURL={this.props.imageURL}
          showSidePanel={this.props.showSidePanel}
        />
      </div>
    );
  }
}

export default AnnotatePage;
