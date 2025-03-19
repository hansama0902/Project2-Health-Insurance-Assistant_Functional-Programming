import { db } from "../../db/firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// 获取保险计划数据
export const fetchInsurancePlans = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "insurance_corp"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      base_premium: Number(doc.data().base_premium) || 0,
      discount: Number(doc.data().discount) || 0,
      finalPremium: Number(doc.data().finalPremium) || 0,
      coverage_deductible: Number(doc.data().coverage_deductible) || 0,
    }));
  } catch (error) {
    console.error("Error fetching insurance plans:", error);
    throw error;
  }
};

// 删除保险计划
export const deleteInsurancePlan = async (planId) => {
  try {
    await deleteDoc(doc(db, "insurance_corp", planId));
    return { success: true, message: "Insurance plan deleted successfully" };
  } catch (error) {
    console.error("Error deleting insurance plan:", error);
    return { success: false, message: error.message };
  }
};

// 更新保险计划（确保数值字段）
export const updateInsurancePlan = async (updatedPlan) => {
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
