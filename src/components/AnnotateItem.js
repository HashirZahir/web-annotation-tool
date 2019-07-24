import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../firebase/firebase";

class AnnotateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbRef: firebase.firestore().collection("images"),
      id: this.props.id,
    };

    console.log(this.state);
  }

  componentDidMount() {
    const dbRef = this.state.dbRef;
    let total, labelled, beingLabelled;

    dbRef
      .where("image_collection_name", "==", this.state.id)
      .get()
      .then(doc => {
        total = doc.docs.length;
        this.setState({ total });
      });

    dbRef
      .where("image_collection_name", "==", this.state.id)
      .where("is_labelled", "==", true)
      .get()
      .then(doc => (labelled = doc.docs.length));

    dbRef
      .where("image_collection_name", "==", this.state.id)
      .where("is_being_labelled", "==", true)
      .get()
      .then(doc => {
        beingLabelled = doc.docs.length;
        const available = total - labelled - beingLabelled;
        this.setState({ available });
      });
  }

  render() {
    return (
      <div>
        <Link
          className="list-item"
          to={{
            pathname: (this.state.available === 0 ? "/dashboard" :`/annotate/${this.props.id}`),
            state: {
              image_collection_name: this.props.id
            }
          }}
        >
          <div>
            <h3 className="list-item__title">{this.props.id}</h3>
          </div>
          <div>
            <p>
              {this.state.available} out of {this.state.total} image(s) left for
              annotation
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

export default AnnotateItem;
