import React, { useState, useEffect, useCallback } from "react";
import { db } from "../../db/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../stylesheets/addInsuranceModal.css";
import PropTypes from "prop-types";

const AddInsuranceModal = ({ show, handleClose }) => {
  const [insuranceData, setInsuranceData] = useState({
    insurer: "",
    tier: "",
    base_premium: "",
    coverage_deductible: "",
    hospital_coverage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
      setInsuranceData({
        insurer: "",
        tier: "",
        base_premium: "",
        coverage_deductible: "",
        hospital_coverage: "",
      });
      setError("");
    }
  }, [show]);

  const handleChange = useCallback((e) => {
    setInsuranceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (
      !insuranceData.insurer ||
      !insuranceData.tier ||
      !insuranceData.base_premium ||
      !insuranceData.coverage_deductible ||
      !insuranceData.hospital_coverage
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "insurance_corp"), {
        insurer: insuranceData.insurer,
        tier: insuranceData.tier,
        base_premium: Number(insuranceData.base_premium),
        coverage_deductible: Number(insuranceData.coverage_deductible),
        hospital_coverage: insuranceData.hospital_coverage,
      });

      alert("Insurance added successfully!");
      handleClose();
    } catch (error) {
      setError("Error adding insurance. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Insurance</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
              <div className="mb-3">
                <label className="form-label">Insurer</label>
                <input
                  type="text"
                  className="form-control"
                  name="insurer"
                  value={insuranceData.insurer}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tier</label>
                <select
                  className="form-select"
                  name="tier"
                  value={insuranceData.tier}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Tier --</option>
                  <option value="Silver">Silver</option>
                  <option value="Bronze">Bronze</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Base Premium ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="base_premium"
                  value={insuranceData.base_premium}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Coverage Deductible ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="coverage_deductible"
                  value={insuranceData.coverage_deductible}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hospital Coverage</label>
                <input
                  type="text"
                  className="form-control"
                  name="hospital_coverage"
                  value={insuranceData.hospital_coverage}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Insurance"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
AddInsuranceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddInsuranceModal;
