import React, { Component } from "react";
import axios from "axios";
import { firebase } from "../firebase/firebase";

export default class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.submitTask = this.submitTask.bind(this);
    this.getBoxes = this.getBoxes.bind(this);
    this.state = {
      uid: (firebase.auth().currentUser !== null ? firebase.auth().currentUser.uid : null)
    };
  }

  /*
   * Return an Array of bounding box positions. (no id)
   */
  getBoxes() {
    const boxes = [];
    for (var key in this.props.boundingBoxes) {
      const box = this.props.boundingBoxes[key];
      boxes.push(box);
    }
    console.log("bboxes: ", boxes);
    return boxes;
  }

  submitTask() {

    var db = firebase.firestore();

    // add annotation to database
    db
      .collection("annotations")
      .add({
        image_collection_name: this.props.image_collection_name,
        filename: this.props.filename,
        owner: this.state.uid,
        image_bbox: this.getBoxes()
      });

    console.log("Annotation created in db successfully.");


    // update image as labelled in database
    db
      .collection("images")
      .where("image_collection_name", "==", this.props.image_collection_name)
      .where("filename", "==", this.props.filename)
      .limit(1)
      .get()

      .then(doc => { 
        console.log(doc);
        const image = (doc.docs.length > 0 ? doc.docs[0] : null); 

        if (doc.docs.length > 0 && image.exists) {
          db.collection("images").doc(image.id)
            .update({
              is_being_labelled: false,
              is_labelled: true
            });

          console.log("Image label status changed successfully");
        } 
        else {
          console.log("image not found");
        }

      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    location.reload(true);
  }



  createInputElement() {
      var error_msg_text;
      // var latest_idx = Object.keys(this.props.boundingBoxes).length-1;
      // TODO: ensure all bboxes have labels before pressing submit
      var latest_bbox = this.props.boundingBoxes[0];

      if (!this.props.hasDrawnBox) {
        error_msg_text = "Draw a box first!";
      }
      else if (latest_bbox.label == null) {
        error_msg_text = "Select Label for Bounding Box";
      }


      if (this.props.hasDrawnBox && latest_bbox.label != null)
        return (
          <button
            name="boundingBoxes"
            type="submit"
            id="submitButton"
            value={JSON.stringify(this.getBoxes())}
            onClick={() => { this.submitTask() }}
            ref={value => {
              this.value = value;
            }}
          >Submit</button>
        );
      else
        return (
          <button
            name="boundingBoxes"
            type="submit"
            id="submitButton"
            disabled
          >{error_msg_text}</button>
        ); 
  }

  render() {
    const inputElement = this.createInputElement();

    return (
      <div id="Submit">
        {inputElement}
      </div>
    );
  }
}
