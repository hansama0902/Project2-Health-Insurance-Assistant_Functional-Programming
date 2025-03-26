import React, { useState } from "react";
import { createCalculatedPlan } from "../utils/PlanFactory";
import "../stylesheets/InsuranceQuoteTable.css";

const InsuranceQuoteTable = ({
  plans,
  userIncome,
  userAge,
  selectedPlans,
  setSelectedPlans,
  onDeletePlan,
  onEditPlan,
}) => {
  const [editingPlan, setEditingPlan] = useState(null);
  const [updatedPlan, setUpdatedPlan] = useState(null);

  if (plans.length === 0) return <p>No insurance plans available</p>;

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Select</th>
            <th>Insurer</th>
            <th>Tier</th>
            <th>Original Premium ($)</th>
            <th>Base Premium ($)</th>
            <th>Discount ($)</th>
            <th>Final Premium ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => {
            const calculatedPlan = createCalculatedPlan(
              plan,
              userIncome,
              userAge,
            );

            const isSelected = selectedPlans.some((p) => p.id === plan.id);
            const isMediCal = plan.special;

            return (
              <tr
                key={plan.id}
                className={
                  isMediCal ? "medi-cal" : isSelected ? "table-success" : ""
                }
              >
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      if (isSelected) {
                        setSelectedPlans((prev) =>
                          prev.filter((p) => p.id !== plan.id),
                        );
                      } else {
                        if (selectedPlans.length >= 2) {
                          alert(
                            "You can only compare up to two insurance plans.",
                          );
                          return;
                        }
                        setSelectedPlans((prev) => [...prev, calculatedPlan]);
                      }
                    }}
                  />
                </td>
                <td className={isMediCal ? "medi-cal" : ""}>{plan.insurer}</td>
                <td className={isMediCal ? "medi-cal" : ""}>{plan.tier}</td>
                <td className={isMediCal ? "medi-cal" : ""}>
                  ${calculatedPlan.originalPremium.toFixed(2)}
                </td>
                <td className={isMediCal ? "medi-cal" : ""}>
                  ${calculatedPlan.basePremium.toFixed(2)}
                </td>
                <td className={isMediCal ? "medi-cal" : ""}>
                  ${calculatedPlan.discount.toFixed(2)}
                </td>
                <td className={isMediCal ? "medi-cal" : ""}>
                  <strong>${calculatedPlan.finalPremium.toFixed(2)}</strong>
                </td>
                <td>
                  {!plan.special && (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditingPlan(plan)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDeletePlan(plan.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {editingPlan && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Insurance Plan</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditingPlan(null)}
                ></button>
              </div>
              <div className="modal-body">
                <label>Base Premium ($)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter new premium"
                  value={updatedPlan?.base_premium || editingPlan.base_premium}
                  onChange={(e) =>
                    setUpdatedPlan({
                      ...editingPlan,
                      base_premium: Number(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingPlan(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onEditPlan(updatedPlan);
                    setEditingPlan(null);
                  }}
                  disabled={!updatedPlan}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceQuoteTable;
