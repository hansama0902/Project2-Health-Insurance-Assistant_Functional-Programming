import React from "react";
import PropTypes from "prop-types";

const InsuranceComparison = ({ selectedPlans, onExitComparison }) => {
  return (
    <div>
      <h2>Comparison Details</h2>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>{selectedPlans[0].insurer}</th>
              <th>{selectedPlans[1].insurer}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tier</td>
              <td>{selectedPlans[0].tier}</td>
              <td>{selectedPlans[1].tier}</td>
            </tr>
            <tr>
              <td>Base Premium ($)</td>
              <td>${selectedPlans[0].basePremium.toFixed(2)}</td>
              <td>${selectedPlans[1].basePremium.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Discount ($)</td>
              <td>${selectedPlans[0].discount.toFixed(2)}</td>
              <td>${selectedPlans[1].discount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Final Premium ($)</td>
              <td>
                <strong>${selectedPlans[0].finalPremium.toFixed(2)}</strong>
              </td>
              <td>
                <strong>${selectedPlans[1].finalPremium.toFixed(2)}</strong>
              </td>
            </tr>
            <tr>
              <td>Coverage Deductible ($)</td>
              <td>${selectedPlans[0].coverage_deductible}</td>
              <td>${selectedPlans[1].coverage_deductible}</td>
            </tr>
            <tr>
              <td>Hospital Coverage</td>
              <td>{selectedPlans[0].hospital_coverage}</td>
              <td>{selectedPlans[1].hospital_coverage}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-danger mb-3" onClick={onExitComparison}>
        Exit Comparison
      </button>
    </div>
  );
};
InsuranceComparison.propTypes = {
  selectedPlans: PropTypes.arrayOf(
    PropTypes.shape({
      insurer: PropTypes.string.isRequired,
      tier: PropTypes.string.isRequired,
      basePremium: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
      finalPremium: PropTypes.number.isRequired,
      coverage_deductible: PropTypes.number.isRequired,
      hospital_coverage: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onExitComparison: PropTypes.func.isRequired,
};

export default InsuranceComparison;
