import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ onAddInsurance, onCompareModeChange, selectedPlans }) => {
  const handleCompareClick = () => {
    if (selectedPlans.length < 2) {
      alert("Please select at least two plans to compare.");
      return;
    }
    onCompareModeChange(selectedPlans);
  };

  const isCompareDisabled = selectedPlans.length < 2;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          onClick={() => window.location.reload()}
        >
          Home
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <button className="btn btn-success mx-2" onClick={onAddInsurance}>
            Add Insurance
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCompareClick}
            disabled={isCompareDisabled}
          >
            Compare Plans
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
