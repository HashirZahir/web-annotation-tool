import React from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UploadPage extends React.Component {
  // Currently uploads to users/{uid}/images
  // TODO:
  // 1. Get list of uploaded images on login and store in state
  // 2. Add the images to state after upload
  // 3. Push to dashboard page
  // 4. Update dashboard page with thumbnails?

  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,
      filenames: [],
      // downloadURLs: [],
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
    // const downloadURL = await firebase
    //   .storage()
    //   .ref(`users/${this.state.uid}/images`)
    //   .child(filename)
    //   .getDownloadURL();

    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      // downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: "Done!",
      isUploading: false
    }));
  };

  render() {
    return (
      <div className="content-container">
        <p>Current uid (for debugging): {this.state.uid}</p>
        <FileUploader
          accept="image/*"
          name="image-uploader-multiple"
          randomizeFilename={false}
          storageRef={firebase.storage().ref(`users/${this.state.uid}/images`)}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          multiple
        />

        <p>Progress: {this.state.uploadProgress}</p>

        <p>Filenames: {this.state.filenames.join(", ")}</p>

        {/* <div>
          {this.state.downloadURLs.map((downloadURL, i) => {
            return <img key={i} src={downloadURL} />;
          })}
        </div> */}

        <Link to="/">
          <button type="button" className="button">
            Back to Dashboard
          </button>
        </Link>
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
