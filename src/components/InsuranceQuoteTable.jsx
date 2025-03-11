import React from "react";
import PremiumCalculator from "./PremiumCalculator";

const InsuranceQuoteTable = ({ plans, userIncome, userAge, onSelectPlan, selectedPlans }) => {
  if (plans.length === 0) return <p>No insurance plans available</p>;

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Select</th>
            <th>Insurer</th>
            <th>Tier</th>
            <th>Base Premium ($)</th>
            <th>Discount ($)</th>
            <th>Final Premium ($)</th>
            <th>Deductible ($)</th>
            <th>Hospital Coverage</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => {
            const { basePremium, discount, finalPremium } = plan.special 
              ? { basePremium: 0, discount: 0, finalPremium: 0 }
              : PremiumCalculator({ plan, userIncome, userAge });

            const isSelected = selectedPlans.some((p) => p.id === plan.id);
            const rowClass = plan.special ? "medi-cal" : "";

            return (
              <tr key={plan.id} className={`${isSelected ? "table-success" : ""} ${rowClass}`}>
                <td>
                  {!plan.special && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectPlan({ 
                        ...plan, 
                        basePremium, 
                        discount, 
                        finalPremium 
                      })}
                    />
                  )}
                </td>
                <td>{plan.insurer}</td>
                <td>{plan.tier}</td>
                <td>${basePremium.toFixed(2)}</td>
                <td>${discount.toFixed(2)}</td>
                <td><strong>${finalPremium.toFixed(2)}</strong></td>
                <td>${plan.coverage_deductible}</td>
                <td>{plan.hospital_coverage}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InsuranceQuoteTable;




