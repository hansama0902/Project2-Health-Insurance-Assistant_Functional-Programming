const InsuranceComparison = ({ plans }) => {
    if (plans.length === 0) return <p>No plans available</p>;
  
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Insurer</th>
            <th>Tier</th>
            <th>Premium</th>
            <th>Deductible</th>
            <th>Coverage</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.insurer}</td>
              <td>{plan.tier}</td>
              <td>${plan.base_premium}</td>
              <td>${plan.coverage_deductible}</td>
              <td>{plan.hospital_coverage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default InsuranceComparison;
  