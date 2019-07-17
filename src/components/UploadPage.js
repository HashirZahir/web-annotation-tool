import React from "react";
import { firebase } from "../firebase/firebase";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UploadPage extends React.Component {
  // Currently uploads to users/{image_collection_name}/images
  // TODO:
  // 1. Get list of uploaded images on login and store in state
  // 2. Add the images to state after upload
  // 3. Push to dashboard page
  // 4. Update dashboard page with thumbnails?

  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,
      image_collection_name: "",
      filenames: [],
      isUploading: false,
      uploadProgress: 0
    };
  }

  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });

  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });

  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      uploadProgress: "Done!",
      isUploading: false
    }));

    firebase
      .firestore()
      .collection("images")
      .add({
        name: this.state.image_collection_name,
        owner: this.state.uid
      });
    var names_list = firebase
      .firestore()
      .collection("image_collection_names")
      .doc("names");

    names_list.update({
      names: firebase.firestore.FieldValue.arrayUnion(
        this.state.image_collection_name
      )
    });
  };

  handleChangeCollectionName = event => {
    this.setState({ image_collection_name: event.target.value });
  };

  render() {
    return (
      <div className="content-container__aligned">
        <div className="form">
          <label>Image Collection Name:</label>
          <input
            type="text"
            className="text-input"
            value={this.state.image_collection_name}
            name="image_collection_name"
            onChange={this.handleChangeCollectionName}
            placeholder="Type a name to get started..."
          />

          <Link to="/">
            <button type="button" className="button-back">
              Back to Dashboard
            </button>
          </Link>
        </div>

        {this.state.image_collection_name !== "" && (
          <div name="upload-images">
            <progress
              value={this.state.uploadProgress}
              className="progress-bar"
              max="100"
            />

            <CustomUploadButton
              accept="image/*"
              name="image-uploader-multiple"
              randomizeFilename={false}
              storageRef={firebase
                .storage()
                .ref(`users/${this.state.image_collection_name}/images`)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              multiple
              className="button-large"
            >
              {this.state.uploadProgress === 0
                ? "Add Images"
                : this.state.uploadProgress +
                  (this.state.uploadProgress === "Done!" ? "" : "%")}
            </CustomUploadButton>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.auth.uid
  };
};

export default connect(mapStateToProps)(UploadPage);
