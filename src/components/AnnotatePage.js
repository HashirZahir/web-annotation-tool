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
          filename={this.props.filename}
          image_collection_name={this.props.image_collection_name}
        />
      </div>
    );
  }
}

export default AnnotatePage;
