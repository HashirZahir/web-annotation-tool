import React from "react";
import { Link } from "react-router-dom";

const AnnotateItem = ({ id }) => (
  <div>
    <Link className="list-item" to={{
      pathname: `/annotate/${id}`,
      state: {
        image_collection_name: id
      }
    }}>
      <div>
        <h3 className="list-item__title">{id}</h3>
      </div>
      <div>
        <p>Date created: {}</p>
        <p>Number of images: {}</p>
      </div>
    </Link>
  </div>
);

export default AnnotateItem;
