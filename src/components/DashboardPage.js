import React from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => (
  <div className="content-container">
      <div>
        <h3>Successfully logged in from DashboardPage</h3>
      </div>
      <Link to="/annotate">
        <button type="button" className="button">
              Annotate
         </button>
      </Link>

      <br /> <br />

      <Link to="/upload">
        <button type="button" className="button">
              Upload
         </button>
      </Link>
  </div>
);

export default DashboardPage;
