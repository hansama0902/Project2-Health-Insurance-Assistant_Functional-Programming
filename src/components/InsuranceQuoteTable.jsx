import React from "react";
import PremiumCalculator from "./PremiumCalculator";

const InsuranceQuoteTable = ({ plans, userIncome, userAge }) => {
  if (plans.length === 0) return <p>No insurance plans available</p>;

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Insurer</th>
            <th>Tier</th>
            <th>Base Premium ($)</th>
            <th>Discount ($)</th>
            <th>Final Premium ($)</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => {
            const { basePremium, discount, finalPremium } = PremiumCalculator({ plan, userIncome, userAge });

            return (
              <tr key={plan.id}>
                <td>{plan.insurer}</td>
                <td>{plan.tier}</td>
                <td>${basePremium.toFixed(2)}</td>
                <td>${discount.toFixed(2)}</td>
                <td><strong>${finalPremium.toFixed(2)}</strong></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InsuranceQuoteTable;

