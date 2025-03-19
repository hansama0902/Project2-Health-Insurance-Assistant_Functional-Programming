import React from "react";
import UserInputForm from "./UserInputForm";
import InsuranceQuoteFetcher from "./InsuranceQuoteFetcher";
import InsuranceComparison from "./InsuranceComparison";

const HealthInsuranceSection = ({ 
  filters, setFilters, 
  compareMode, selectedPlans, 
  onSelectPlan, onDeletePlan, onEditPlan 
}) => {
  return (
    <div className="container text-center">
      <h1 className="my-4 text-light">Health Insurance Assistant</h1>

      <div className="card text-light p-4 shadow-lg">
        <UserInputForm onSearch={setFilters} />
      </div>

      <div className="mt-4">
        {compareMode ? (
          <InsuranceComparison selectedPlans={selectedPlans} />
        ) : (
          filters && (
            <InsuranceQuoteFetcher 
              filters={filters} 
              onSelectPlan={onSelectPlan} 
              selectedPlans={selectedPlans}
              onDeletePlan={onDeletePlan} 
              onEditPlan={onEditPlan} 
            />
          )
        )}
      </div>
    </div>
  );
};

export default HealthInsuranceSection;
