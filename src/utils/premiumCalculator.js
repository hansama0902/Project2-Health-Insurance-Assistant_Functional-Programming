const premiumCalculator = ({ plan, userIncome, userAge }) => {
    let discount = 0;
    let basePremium = Number(plan.base_premium) || 0; // 确保 base_premium 为数值
    let originalPremium = basePremium;
  
    if (userAge > 35 && userAge <= 55) {
      basePremium *= 2;
    } else if (userAge > 55) {
      basePremium *= 3;
    }
  
    if (userIncome < 35000) {
      discount = basePremium * 0.2;
    } else if (userIncome < 50000) {
      discount = basePremium * 0.1;
    }
  
    const finalPremium = basePremium - discount;
  
    return { basePremium, discount, finalPremium, originalPremium };
  };
  
  export { premiumCalculator };
  