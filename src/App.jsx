import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import UserInputForm from "./components/UserInputForm";
import InsuranceQuoteFetcher from "./components/InsuranceQuoteFetcher";
import AddInsuranceModal from "./components/AddInsuranceModal";
import InsuranceComparison from "./components/InsuranceComparison";

const App = () => {
  const [filters, setFilters] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);

  const handleSelectPlan = (plan) => {
    setSelectedPlans((prev) => {
      if (prev.some((p) => p.id === plan.id)) {
        return prev.filter((p) => p.id !== plan.id);
      } else if (prev.length < 2) {
        return [...prev, plan];
      } else {
        return prev;
      }
    });
  };

  const handleCompareModeChange = (plans) => {
    setSelectedPlans(plans);
    setCompareMode(true);
  };

  return (
    <>
      <Navbar 
        onAddInsurance={() => setShowAddModal(true)} 
        onCompareModeChange={handleCompareModeChange}
        selectedPlans={selectedPlans}
      />

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
                onSelectPlan={handleSelectPlan} 
                selectedPlans={selectedPlans} 
              />
            )
          )}
        </div>
      </div>

      <AddInsuranceModal show={showAddModal} handleClose={() => setShowAddModal(false)} />
    </>
  );
};

export default App;




