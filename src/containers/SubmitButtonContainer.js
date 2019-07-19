import { connect } from "react-redux";
import SubmitButton from "../components/SubmitButton";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const committedBoxes = state.turktool.committedBoxes.present;
  return {
    image_collection_name: ownProps.image_collection_name,
    filename: ownProps.filename,
    image_label: ownProps.image_label,
    hasDrawnBox: Object.keys(committedBoxes).length > 0,
    boundingBoxes: committedBoxes,
    imageHeight: state.turktool.imageProps.height,
    imageWidth: state.turktool.imageProps.width
  };
};

const SubmitButtonContainer = withRouter(
  connect(mapStateToProps)(SubmitButton)
);

export default SubmitButtonContainer;
