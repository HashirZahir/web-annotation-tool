import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../firebase/firebase";
import AnnotateItem from "./AnnotateItem";
import { saveAs } from "file-saver";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_items: null,
      docRef: firebase
        .firestore()
        .collection("image_collection_names")
        .doc("names"),
      dbRef: firebase.firestore().collection("images")
    };
  }

  componentDidMount() {
    var docRef = this.state.docRef;
    docRef
      .get()
      .then(doc => {
        var image_items = [];
        if (doc.exists) {
          console.log("Document data:", doc.data());
          image_items = doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

        this.setState({ image_items });
        console.log("image items: ", this.state.image_items);
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  startDelete(item) {
    var names_list = firebase
      .firestore()
      .collection("image_collection_names")
      .doc("names");

    names_list.update({
      names: firebase.firestore.FieldValue.arrayRemove(item)
    });

    const newArray = this.state.image_items;
    newArray.names = newArray.names.filter(i => i !== item);

    this.setState({
      image_items: newArray
    });

    // TODO: update images property
    // Actually delete images in storage
  }

  startDownload(item) {
    let annotationRef = firebase
      .firestore()
      .collection("annotations")
      .where("image_collection_name", "==", item)
      .get()
      .then(snapshot =>
        snapshot.forEach(blob => {
          const download = new Blob([JSON.stringify(blob.data(), null, 1)], {
            type: "text/plain;charset=utf-8"
          });
          saveAs(download, `${item}.xml`);
        })
      );
  }

  render() {
    return (
      <div className="content-container">
        <Link to="/upload">
          <button type="button" className="button-large__top">
            Upload Images
          </button>
        </Link>

        <div className="list-header">
          <h2>Images available for annotation</h2>
        </div>

        <div className="list-body">
          {this.state.image_items === null ? (
            <div className="list-item list-item__message">
              <span>Loading...</span>
            </div>
          ) : this.state.image_items.names.length === 0 ? (
            <div className="list-item list-item__message">
              <span>Nothing to annotate, upload some images first!</span>
            </div>
          ) : (
            this.state.image_items.names.map(item => {
              return (
                <div key={item} className="list-animation">
                  <AnnotateItem key={item} id={item} />
                  <div className="list-footer">
                    <button
                      className="list-button"
                      onClick={this.startDownload.bind(this, item)}
                    >
                      Download Annotations
                    </button>
                    <button
                      className="list-button-danger"
                      onClick={this.startDelete.bind(this, item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
