import { useState } from "react";
const UserInputForm = ({ onSearch }) => {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [tier, setTier] = useState("r");
  const [error, setError] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();


    if (age <= 0 || income <= 0) {
      setError("Age and income must be positive numbers.");
      return;
    }

    setError(""); 
    onSearch({ age: parseInt(age), income: parseFloat(income), tier });
  };

  return (
    <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
      {error && <p className="text-danger">{error}</p>} {/* Display error message */}
      
      <div className="mb-3 w-75">
        <label className="form-label">Age:</label>
        <input 
          type="number" 
          className="form-control" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          required
          min="0" 
        />
      </div>

      <div className="mb-3 w-75">
        <label className="form-label">Annual Income:</label>
        <input 
          type="number" 
          className="form-control" 
          value={income} 
          onChange={(e) => setIncome(e.target.value)} 
          required
          min="0" 
        />
      </div>

      <div className="mb-3 w-75">
        <label className="form-label">Insurance Tier:</label>
        <select className="form-select" value={tier} onChange={(e) => setTier(e.target.value)}>
        <option value="">-- Select Tier --</option> 
        <option value="All Options">All Options</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Get Quotes</button>
    </form>
  );
};

export default UserInputForm;

