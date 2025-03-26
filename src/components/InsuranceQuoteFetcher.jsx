import { useState, useEffect, useCallback } from "react";
import InsuranceQuoteTable from "./InsuranceQuoteTable";
import mediCalPlanSingleton from "../utils/MediCalPlanSingleton";
import {
  fetchInsurancePlans,
  deleteInsurancePlan,
  updateInsurancePlan,
} from "../utils/insuranceService";

const InsuranceQuoteFetcher = ({
  filters,
  selectedPlans,
  setSelectedPlans,
}) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPlans = useCallback(async () => {
    try {
      let plansData = await fetchInsurancePlans();

      if (filters?.tier && filters.tier !== "All Options") {
        plansData = plansData.filter((plan) => plan.tier === filters.tier);
      }
      // filter()
      plansData.sort((a, b) => a.base_premium - b.base_premium);

      if (filters?.income < 30000) {
        plansData.unshift(mediCalPlanSingleton.getPlan());
      }

      setPlans(plansData);

      const filteredSelected = selectedPlans.reduce((acc, p) => {
        if (plansData.find((plan) => plan.id === p.id)) acc.push(p);
        return acc;
      }, []);
      //reduce()
      setSelectedPlans(filteredSelected);

      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [filters, selectedPlans, setSelectedPlans]);

  const handleDeletePlan = async (planId) => {
    const result = await deleteInsurancePlan(planId);
    if (result.success) {
      const updatedPlans = plans.filter((plan) => plan.id !== planId);
      setPlans(updatedPlans);

      const updatedSelectedPlans = selectedPlans
        .filter((plan) => plan.id !== planId)
        .filter((plan) => updatedPlans.find((p) => p.id === plan.id));

      if (updatedSelectedPlans.length === 0 && updatedPlans.length > 0) {
        setSelectedPlans([updatedPlans[0]]);
      } else {
        setSelectedPlans(updatedSelectedPlans);
      }

      alert(result.message);
    } else {
      alert("Failed to delete the insurance plan");
    }
  };

  const handleEditPlan = async (updatedPlan) => {
    const result = await updateInsurancePlan(updatedPlan);
    if (result.success) {
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === updatedPlan.id ? updatedPlan : plan,
        ),
      );
      // map
      alert(result.message);
    } else {
      alert("Failed to update the insurance plan");
    }
  };

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  return (
    <div>
      <h2>Insurance Quotes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <InsuranceQuoteTable
          plans={plans}
          userIncome={filters?.income}
          userAge={filters?.age}
          selectedPlans={selectedPlans}
          setSelectedPlans={setSelectedPlans}
          onDeletePlan={handleDeletePlan}
          onEditPlan={handleEditPlan}
        />
      )}
    </div>
  );
};

export default InsuranceQuoteFetcher;
