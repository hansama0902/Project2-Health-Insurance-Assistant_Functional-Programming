import { db } from "../../db/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const fetchInsurancePlans = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "insurance_corp"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      base_premium: Number(doc.data().base_premium) || 0,
      coverage_deductible: Number(doc.data().coverage_deductible) || 0,
    }));
  } catch (error) {
    console.error("Error fetching insurance plans:", error);
    return { success: false, message: error.message };
  }
};

const deleteInsurancePlan = async (planId) => {
  try {
    await deleteDoc(doc(db, "insurance_corp", planId));
    return { success: true, message: "Insurance plan deleted successfully" };
  } catch (error) {
    console.error("Error deleting insurance plan:", error);
    return { success: false, message: error.message };
  }
};

const updateInsurancePlan = async (updatedPlan) => {
  try {
    const planRef = doc(db, "insurance_corp", updatedPlan.id);
    const formattedPlan = {
      ...updatedPlan,
      base_premium: Number(updatedPlan.base_premium) || 0,
      coverage_deductible: Number(updatedPlan.coverage_deductible) || 0,
    };
    await updateDoc(planRef, formattedPlan);
    return { success: true, message: "Insurance plan updated successfully" };
  } catch (error) {
    console.error("Error updating insurance plan:", error);
    return { success: false, message: error.message };
  }
};
export { fetchInsurancePlans, deleteInsurancePlan, updateInsurancePlan };
