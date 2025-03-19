import { useState } from "react";
import { deleteInsurancePlan, updateInsurancePlan } from "../utils/insuranceService"; // ✅ 引入 API 逻辑

const useInsuranceManager = () => {
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

  const handleDeletePlan = async (planId) => {
    const result = await deleteInsurancePlan(planId);
    alert(result.message);
  };

  const handleEditPlan = async (updatedPlan) => {
    const result = await updateInsurancePlan(updatedPlan);
    alert(result.message);
  };

  return { selectedPlans, handleSelectPlan, handleDeletePlan, handleEditPlan };
};

export default useInsuranceManager;
