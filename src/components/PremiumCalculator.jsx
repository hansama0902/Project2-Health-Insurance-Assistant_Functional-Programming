const PremiumCalculator = ({ plan, userIncome, userAge }) => {
    let discount = 0;
    let basePremium = plan.base_premium;
  
    // 如果年龄超过 55，保费翻倍
    if (userAge > 35 && userAge <= 55) {
      basePremium *= 2;
    } else if (userAge > 55) {
      basePremium *= 3;
    }
  
    // 计算折扣
    if (userIncome < 35000) {
      discount = basePremium * 0.2; // 低收入用户 20% 折扣
    } else if (userIncome < 50000) {
      discount = basePremium * 0.1; // 中等收入用户 10% 折扣
    }
  
    const finalPremium = basePremium - discount;
  
    // 返回计算后的数据
    return { basePremium, discount, finalPremium };
  };
  
  export default PremiumCalculator;
  
  
  