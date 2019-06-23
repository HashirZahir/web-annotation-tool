import React from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => (
  <div>
      <div>
        <h3>Successfully logged in from DashboardPage</h3>
      </div>
      <Link to="/annotate">
        <button type="button">
              Annotate
         </button>
      </Link>
  </div>
);

export default DashboardPage;
