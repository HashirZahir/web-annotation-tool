import React, { Component } from "react";
import BoundingBoxes from "./BoundingBoxes";
import ImageContainer from "../containers/ImageContainer";
import Crosshair from "../components/Crosshair";
import InfoPanel from "../components/InfoPanel";
import { calculateRectPosition, isRectangleTooSmall } from "../utils/drawing";
import SubmitButtonContainer from "../containers/SubmitButtonContainer";
import Select from 'react-select';

/**
 * `LabelView` is a container for `LabelImage` and
 * `BoundingBoxes` components.
 */
class LabelView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.createRectangle = this.createRectangle.bind(this);
    this.updateCursorPosition = this.updateCursorPosition.bind(this);
    this.getCurrentBox = this.getCurrentBox.bind(this);
    this.refreshDrawing = this.refreshDrawing.bind(this);
    this.isCrosshairReady = this.isCrosshairReady.bind(this);
    this.labelChangeHandler = this.labelChangeHandler.bind(this);

    this.state = {
      isDrawing: false,
      currentBoxId: 0,
      startX: null,
      startY: null,
      currX: null,
      currY: null,
      imgLoaded: false,
      imageUrl: null,
      showCrosshair: true,
      image_label: null,
      isLabelSelection: false
    };
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  getCurrentBox() {
    return {
      startX: this.state.startX,
      startY: this.state.startY,
      currX: this.state.currX,
      currY: this.state.currY
    };
  }

  handleKeyPress(event) {
    switch (event.keyCode) {
      case 67:
        console.log("You just pressed C!");
        this.setState(prevState => {
          return {
            showCrosshair: !prevState.showCrosshair
          }
        });
        break;
      case 90:
        console.log("You just pressed Z!");
        if (this.props.canUndo) this.props.onUndo();
        break;
      case 88:
        console.log("You just pressed X!");
        if (this.props.canRedo) this.props.onRedo();
        break;
      default:
        break;
    }
  }

  createRectangle(event) {
    this.setState({
      isDrawing: true,
      startX: event.pageX,
      startY: event.pageY,
      currX: event.pageX,
      currY: event.pageY
    });
  }

  updateCursorPosition(event) {
    this.setState({
      currX: event.pageX,
      currY: event.pageY
    });
  }

  mouseDownHandler(event) {
    // console.log("down");
    // only start drawing if the mouse was pressed
    // down inside the image that we want labelled
    console.log(event.target.className);
    if (
      event.target.className !== "line" &&
      event.target.id !== "LabelViewImg" &&
      event.target.className !== "BoundingBox" &&
      event.target.id !== "Crosshair"
    )
      return;
    event.persist();
    this.createRectangle(event);
  }

  mouseMoveHandler(event) {
    // console.log("move");
    // only update the state if is drawing
    event.persist();
    this.updateCursorPosition(event);
  }

  mouseUpHandler(event) {
    // console.log(this.props.imageProps);
    // console.log("up");
    const boxPosition = calculateRectPosition(
      this.props.imageProps,
      this.getCurrentBox()
    );

    if (this.state.isDrawing && !isRectangleTooSmall(boxPosition)) {
      // drawing has ended, and coord is not null,
      // so this rectangle can be committed permanently
      this.props.commitDrawingAsBox(this.state.currentBoxId, boxPosition);
      this.state.isLabelSelection = true;
    }
    this.refreshDrawing();
  }

  refreshDrawing() {
    this.setState(prevState => {
      return {
        ...prevState,
        isDrawing: false,
        currentBoxId: prevState.isDrawing
          ? prevState.currentBoxId + 1
          : prevState.currentBoxId,
        startX: null,
        startY: null
      };
    });
  }

  isCrosshairReady() {
    return this.state.currX &&
      this.state.currY &&
      this.props.imageProps.height &&
      this.props.imageProps.width &&
      !this.state.isLabelSelection;
  }

  labelChangeHandler = selectedOption => {
    this.setState({ 
      image_label: selectedOption,
      isLabelSelection : false
    });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    // console.log("re-render LabelView");
    // TODO: get committed rectangles from Redux store
    // console.log(this.props);
    // console.log(this.state);
    var boxesToRender = this.props.committedBoxes.slice(0);

    const options = [
      { value: 'cat', label: 'Cat' },
      { value: 'dog', label: 'Dog' },
      { value: 'person', label: 'Person' }
    ];

    if (this.state.startX != null) {
      boxesToRender.push({
        id: this.state.currentBoxId,
        position: calculateRectPosition(
          this.props.imageProps,
          this.getCurrentBox()
        )
      });
    }

    var topPX = 0, leftPX = 0;
    var box_position = [];
    if ((this.props.committedBoxes).length > 0){
      box_position = this.props.committedBoxes[this.props.committedBoxes.length-1].position;
      topPX = box_position.top + box_position.height;
      leftPX = box_position.left;
    }
    return (
      <div
        id="LabelViewContainer"
        onMouseDown={this.mouseDownHandler}
        onMouseUp={this.mouseUpHandler}
        onMouseMove={this.mouseMoveHandler}
      >
        <div id="Middle">
          <div id="LabelView">
            {this.state.showCrosshair && this.isCrosshairReady() &&
              <Crosshair
                x={this.state.currX}
                y={this.state.currY}
                imageProps={this.props.imageProps}
              />
            }
            {boxesToRender.length > 0 && (
              <BoundingBoxes
                className="BoundingBoxes unselectable"
                boxes={boxesToRender}
                isDrawing={this.state.isDrawing}
              />
            )}

            {this.state.isLabelSelection && (

              <div style={{top: +topPX, left: leftPX, width: '30%', position: 'absolute', zIndex:'1'}}>
                <Select 
                  options={options} 
                  menuIsOpen={true}
                  autofocus={true}
                  onChange={this.labelChangeHandler}
                  disabled={this.state.isLabelSelection}
                />
              </div>
            )}
            <ImageContainer imageURL={this.props.imageURL} />
          </div>
          {this.props.showSidePanel &&
            <div id="SidePanel">
              <InfoPanel />
              <SubmitButtonContainer 
                filename={this.props.filename}
                image_collection_name={this.props.image_collection_name}
                image_label={this.state.image_label}
              />
            </div>
          }
          <div style={{clear: "both"}} />
        </div>
      </div>
    );
  }
}

export default LabelView;
