import React, { Component } from 'react'
import AnnotatePage from '../components/AnnotatePage'
import config from '../config'
import queryString from 'qs'
import { firebase } from "../firebase/firebase";

export default class AnnotateContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.loadImageURL = this.loadImageURL.bind(this);
    this.state = { 
      imageURL: null,
      imgFolderURL : null,
      dbRef: firebase
        .firestore()
        .collection("images")
    };
  }

  componentDidMount() {
    this.state.imgFolderURL = this.props.location.state.imgFolderURL;
    console.log("parent img folder name: ", this.state.imgFolderURL );
    this.loadImageURL();
  }

  loadImageURL() {
    var dbRef = this.state.dbRef;
    dbRef
      .where("image_collection_name", "==", this.state.imgFolderURL)
      .where("is_labelled", "==", false)
      .where("is_being_labelled", "==", false)
      .limit(1)
      .get()

      .then(doc => {
        doc = doc.docs[0];
        
        console.log(doc);
        if (doc.exists) {
          console.log("Document data:", doc.data());
          
          const filename = doc.data().filename;
          this.getFirebaseImageURL(filename);
        } 
        else {
          console.log("No data in database or all images have been annotated");
        }

      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  getFirebaseImageURL(filename) {
    const imgRef=firebase
                .storage()
                .ref(`users/${this.state.imgFolderURL}/images/${filename}`);
    console.log("image url: ", `users/${this.state.imgFolderURL}/images/${filename}`);

    imgRef.getDownloadURL().then(imageURL => {
      if (imageURL) {
        console.log("imageURL: ", imageURL);
      }
      else {
        imageURL = null;
      }

      this.setState({ imageURL });
    })
  }

  render() {
    console.log(this.state.imageURL);
    return <AnnotatePage imageURL={this.state.imageURL} />
  }
}
