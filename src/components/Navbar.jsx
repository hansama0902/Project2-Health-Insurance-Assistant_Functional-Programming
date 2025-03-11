import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ onAddInsurance, onCompareModeChange, selectedPlans }) => {
  const handleCompareClick = () => {
    if (selectedPlans.length !== 2) {
      alert("Please select exactly two plans to compare.");
      return;
    }
    onCompareModeChange(selectedPlans);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <div className="container-fluid">
        <a className="navbar-brand" href="window.location.reload()">Home</a>

        <div className="d-flex ms-auto">
          <button className="btn btn-success mx-2" onClick={onAddInsurance}>
            Add Insurance
          </button>
          <button className="btn btn-primary" onClick={handleCompareClick}>
            Compare Plans
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



