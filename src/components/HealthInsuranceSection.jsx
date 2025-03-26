import React from "react";
import UserInputForm from "./UserInputForm";
import InsuranceQuoteFetcher from "./InsuranceQuoteFetcher";
import InsuranceComparison from "./InsuranceComparison";
import PropTypes from "prop-types";

const HealthInsuranceSection = ({
  filters,
  setFilters,
  compareMode,
  disableCompareMode,
  selectedPlans,
  setSelectedPlans,
  onDeletePlan,
  onEditPlan,
}) => {
  return (
    <div className="container text-center">
      <h1 className="my-4 text-light">Health Insurance Assistant</h1>

      <div className="card text-light p-4 shadow-lg">
        <UserInputForm onSearch={setFilters} />
      </div>

      <div className="mt-4">
        {compareMode ? (
          <InsuranceComparison
            selectedPlans={selectedPlans}
            onExitComparison={disableCompareMode}
          />
        ) : (
          filters && (
            <InsuranceQuoteFetcher
              filters={filters}
              setSelectedPlans={setSelectedPlans}
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
HealthInsuranceSection.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func.isRequired,
  compareMode: PropTypes.bool.isRequired,
  disableCompareMode: PropTypes.func.isRequired,
  selectedPlans: PropTypes.array.isRequired,
  setSelectedPlans: PropTypes.func.isRequired,
  onDeletePlan: PropTypes.func.isRequired,
  onEditPlan: PropTypes.func.isRequired,
};

export default HealthInsuranceSection;
