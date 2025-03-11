import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import InsuranceQuoteTable from "./InsuranceQuoteTable";

const InsuranceQuoteFetcher = ({ filters, onSelectPlan, selectedPlans }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "insurance_corp"));

        let plansData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));


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
      } catch (error) {
        console.error("Error fetching insurance plans:", error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, [filters]);

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
        />
      )}
    </div>
  );
};

export default InsuranceQuoteFetcher;





