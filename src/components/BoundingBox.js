import React, { Component } from "react";
import DeleteBoxButtonContainer from "../containers/DeleteBoxButtonContainer";

export default class BoundingBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
    this.timer = null;
    this.state = {
      mouseOver: false
    };
  }

  mouseOverHandler() {
    if (!this.state.mouseOver && !this.props.isDrawing) {
      this.timer = setTimeout(() => {
        this.setState({ mouseOver: true });
      }, 100);
    }
  }

  mouseLeaveHandler() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.setState({ mouseOver: false });
  }

  render() {
    //console.log(this.props.box);
    return (
      <div
        className="BoundingBox"
        style={this.props.box.position}
        onMouseOver={this.mouseOverHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        {this.state.mouseOver && (
          <DeleteBoxButtonContainer
            boxId={this.props.box.id}
            isDrawing={this.props.isDrawing}
          />
        )}
      </div>
    );
  }
}
