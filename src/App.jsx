import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import UserInputForm from "./components/UserInputForm";
import InsuranceQuoteFetcher from "./components/InsuranceQuoteFetcher";
import AddInsuranceModal from "./components/AddInsuranceModal";

const App = () => {
  const [filters, setFilters] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <Navbar onAddInsurance={() => setShowAddModal(true)} />

      <div className="container text-center">
        <h1 className="my-4 text-light">Health Insurance Assistant</h1>
        <div className="card text-light p-4 shadow-lg">
          <UserInputForm onSearch={setFilters} />
        </div>
        {filters && (
          <div className="mt-4">
            <InsuranceQuoteFetcher filters={filters} />
          </div>
        )}
      </div>

      <AddInsuranceModal show={showAddModal} handleClose={() => setShowAddModal(false)} />
    </>
  );
};

export default App;



