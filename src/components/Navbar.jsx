import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ onAddInsurance, onCompare }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <div className="container-fluid">  
        <a className="navbar-brand" href="#">Health Insurance Assistant</a>

        <div className="d-flex ms-auto">
          <button className="btn btn-success mx-2" onClick={onAddInsurance}>
            Add Insurance
          </button>
          <button className="btn btn-primary" onClick={onCompare}>
            Compare Plans
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
