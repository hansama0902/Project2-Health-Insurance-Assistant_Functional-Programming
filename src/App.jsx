import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import HealthInsuranceSection from "./components/HealthInsuranceSection";
import AddInsuranceModal from "./components/AddInsuranceModal";
import useInsuranceManager from "./hooks/useInsuranceManager";
import useCompareMode from "./hooks/useCompareMode";

const App = () => {
  const [filters, setFilters] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const {
    selectedPlans,
    setSelectedPlans,
    handleSelectPlan,
    handleDeletePlan,
    handleEditPlan,
  } = useInsuranceManager();

  const { compareMode, enableCompareMode, disableCompareMode } =
    useCompareMode();

  return (
    <>
      <Navbar
        onAddInsurance={() => setShowAddModal(true)}
        onCompareModeChange={enableCompareMode}
        selectedPlans={selectedPlans}
      />

      <HealthInsuranceSection
        filters={filters}
        setFilters={setFilters}
        compareMode={compareMode}
        disableCompareMode={disableCompareMode}
        selectedPlans={selectedPlans}
        onSelectPlan={handleSelectPlan}
        setSelectedPlans={setSelectedPlans}
        onDeletePlan={handleDeletePlan}
        onEditPlan={handleEditPlan}
      />

      <AddInsuranceModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
    </>
  );
};

export default App;
