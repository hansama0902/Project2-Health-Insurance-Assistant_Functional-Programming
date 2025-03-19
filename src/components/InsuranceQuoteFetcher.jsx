import { useState, useEffect, useCallback } from "react";
import InsuranceQuoteTable from "./InsuranceQuoteTable";
import {
  fetchInsurancePlans,
  deleteInsurancePlan,
  updateInsurancePlan,
} from "../utils/insuranceService";

const InsuranceQuoteFetcher = ({ filters, onSelectPlan, selectedPlans, setSelectedPlans }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPlans = useCallback(async () => {
    try {
      let plansData = await fetchInsurancePlans();

      if (filters?.tier && filters.tier !== "All Options") {
        plansData = plansData.filter((plan) => plan.tier === filters.tier);
      }

      plansData.sort((a, b) => a.base_premium - b.base_premium);

      if (filters?.income < 30000) {
        const mediCalPlan = {
          id: "medi-cal",
          insurer: "Medi-Cal",
          tier: "Special",
          base_premium: 0,
          discount: 0,
          finalPremium: 0,
          coverage_deductible: 0,
          hospital_coverage: "All Hospitals",
          special: true, 
        };
        plansData.unshift(mediCalPlan);
      }

      setPlans(plansData);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [filters]);

  const handleDeletePlan = async (planId) => {
    const result = await deleteInsurancePlan(planId);
    if (result.success) {
      setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== planId));
      setSelectedPlans([]);
      alert(result.message);
    } else {
      alert("Failed to delete the insurance plan");
    }
  };
  
  const handleEditPlan = async (updatedPlan) => {
    const result = await updateInsurancePlan(updatedPlan);
    if (result.success) {
      setPlans((prevPlans) =>
        prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
      );
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
          onSelectPlan={onSelectPlan}
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









