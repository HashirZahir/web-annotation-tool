import React from "react";
import firebase from "firebase";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
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
      image_collection_name: "",
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

  handleChangeCollectionName = event => {
    this.setState({ image_collection_name: event.target.value });
  };

  render() {
    return (
      <div className="content-container">
        <label>Image Collection Name:</label>
        <input
          type="text"
          value={this.state.image_collection_name}
          name="image_collection_name"
          onChange={this.handleChangeCollectionName}
        />
        {this.state.image_collection_name !== "" && (
          <div name="upload-images">
            <CustomUploadButton
              accept="image/*"
              name="image-uploader-multiple"
              randomizeFilename={false}
              storageRef={firebase.storage().ref(`users/${this.state.image_collection_name}/images`)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              multiple
              className="button"
              >
              Add Images
            </CustomUploadButton>

            <p>Progress: {this.state.uploadProgress}</p>

            <p>Filenames: {this.state.filenames.join(", ")}</p>

            {/* <div>
              {this.state.downloadURLs.map((downloadURL, i) => {
                return <img key={i} src={downloadURL} />;
              })}
            </div> */}


          </div>
        )}
        
        <br></br><br></br><br></br>
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
