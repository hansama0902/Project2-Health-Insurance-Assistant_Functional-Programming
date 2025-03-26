import { useState } from "react";
import deleteInsurancePlan from "../utils/deleteInsurancePlan";
import updateInsurancePlan from "../utils/updateInsurancePlan";

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

  return {
    selectedPlans,
    setSelectedPlans,
    handleSelectPlan,
    handleDeletePlan,
    handleEditPlan,
  };
};

export default useInsuranceManager;
