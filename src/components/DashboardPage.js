import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../firebase/firebase";
import AnnotateItem from "./AnnotateItem";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_items: null,
      docRef: firebase
        .firestore()
        .collection("image_collection_names")
        .doc("names")
    };
  }

  componentDidMount() {
    var docRef = this.state.docRef;
    // var image_collection_names = [];
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
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    console.log("image items: ", this.state.image_items);
  }

  render() {
    // let image_items = this.state.image_items ? <h1>No Data</h1> : ;

    return (
      <div className="content-container">
        {/* <div>
          <pre>{JSON.stringify(this.state.image_items)}</pre>
        </div> */}
        {/* <Link to="/annotate">
          <button type="button" className="button">
            Annotate
          </button>
        </Link> */}
        
        <Link to="/upload">
          <button type="button" className="button-large__top">
            Upload Images
          </button>
        </Link>

        <div className="list-header">
          <h2>Images available for annotation</h2>
        </div>

        <div className="list-body">
          {this.state.image_items === null || this.state.image_items.length === 0 ? (
            <div className="list-item list-item--message">
              <span>Nothing to annotate, upload some images first!</span>
            </div>
          ) : (
            this.state.image_items.names.map(item => {
              return <AnnotateItem key={item} id={item}/>;
            })
          )}
        </div>
      </div>
    );
  }
}
