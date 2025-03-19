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

  // ✅ 保险计划管理 Hook
  const { selectedPlans, handleSelectPlan, handleDeletePlan, handleEditPlan } = useInsuranceManager();
  
  // ✅ 保险对比模式 Hook
  const { compareMode, enableCompareMode } = useCompareMode();

  return (
    <>
      <Navbar 
        onAddInsurance={() => setShowAddModal(true)} 
        onCompareModeChange={enableCompareMode}
        selectedPlans={selectedPlans}
      />

      {/* ✅ 健康保险相关部分 */}
      <HealthInsuranceSection 
        filters={filters}
        setFilters={setFilters}
        compareMode={compareMode}
        selectedPlans={selectedPlans}
        onSelectPlan={handleSelectPlan}
        onDeletePlan={handleDeletePlan}
        onEditPlan={handleEditPlan}
      />

      <AddInsuranceModal show={showAddModal} handleClose={() => setShowAddModal(false)} />
    </>
  );
};

export default App;






