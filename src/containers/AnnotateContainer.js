import React, { Component } from "react";
import AnnotatePage from "../components/AnnotatePage";
import config from "../config";
import queryString from "qs";
import { firebase } from "../firebase/firebase";

export default class AnnotateContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.loadImageURL = this.loadImageURL.bind(this);
    this.state = {
      imageURL: null,
      image_collection_name: null,
      filename: null,
      dbRef: firebase.firestore().collection("images")
    };
  }

  componentDidMount() {
    this.state.image_collection_name = this.props.location.state.image_collection_name;
    console.log("parent img folder name: ", this.state.image_collection_name);
    this.loadImageURL();
  }

  loadImageURL() {
    var dbRef = this.state.dbRef;
  
    dbRef
      .where("image_collection_name", "==", this.state.image_collection_name)
      .where("is_labelled", "==", false)
      .where("is_being_labelled", "==", false)
      .limit(1)
      .get()
      .then(doc => {
        var filename;
        const image = doc.docs.length > 0 ? doc.docs[0] : null;
        console.log("Document data: ", doc);

        if (doc.docs.length > 0 && image.exists) {
          console.log("Image data:", image.data());

          filename = image.data().filename;
          this.getFirebaseImageURL(filename);
          dbRef.doc(image.id).update({ is_being_labelled: true });
        } else {
          console.log("No data in database or all images have been annotated");
        }

        this.setState({ filename });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  getFirebaseImageURL(filename) {
    const imgRef = firebase
      .storage()
      .ref(`users/${this.state.image_collection_name}/images/${filename}`);
    console.log(
      "image url: ",
      `users/${this.state.image_collection_name}/images/${filename}`
    );

    imgRef.getDownloadURL().then(imageURL => {
      if (imageURL) {
        console.log("imageURL: ", imageURL);
      } else {
        imageURL = null;
      }

      this.setState({ imageURL });
    });
  }

  render() {
    console.log(this.state.imageURL);
    return (
      <AnnotatePage
        imageURL={this.state.imageURL}
        filename={this.state.filename}
        image_collection_name={this.state.image_collection_name}
      />
    );
  }
}
