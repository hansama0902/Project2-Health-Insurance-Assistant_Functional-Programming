# Health Insurance Assistant

**Health Insurance Assistant** is a user-friendly application designed to help California residents quickly access personalized health insurance plans and quotes. Users can input their age, annual income, and insurance preferences to view available health insurance options from Covered California partner insurers, such as Anthem Blue Cross and Kaiser Permanente. The application clearly indicates eligibility for special discounted insurance options, providing transparent and detailed plan comparisons to assist users in making informed decisions. By highlighting special discounts for eligible users, the Health Insurance Assistant simplifies the process of selecting the best insurance coverage, making it efficient and accessible for everyone.

---

## Key Features

- **Personalized Plan Recommendations:** Provides tailored insurance plan suggestions based on the user's age, income, and preferences.

- **Comprehensive Plan Comparison:** Allows users to compare various insurance plans side-by-side, detailing premiums, coverage, and other essential factors.

- **Special Discount Notifications:** Alerts users to eligibility for special discounted insurance options, ensuring they maximize available benefits.

- **User-Friendly Interface:** Features an intuitive design that simplifies the process of inputting information and reviewing insurance options.

- **Secure Data Handling:** Ensures that all user data is processed securely, maintaining confidentiality and compliance with relevant regulations.

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hansama0902/Project2-Health-Insurance-Assistant_Functional-Programming.git
cd Project2-Health-Insurance-Assistant_Functional-Programming
```

### 2. Install Dependencies

Ensure you have **Node.js** installed, then run:

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root directory and populate it with your configuration details based on the `.env.example` provided.

### 4. Run the Application

To start the application:

```bash
npm run dev
```

Then, visit `http://localhost:5173` in your browser.

---

## Technical Implementation

### Key Components

- **`UserInputForm`:** Captures user details to filter and recommend suitable insurance plans.

- **`InsuranceQuoteFetcher`:** Fetches and filters insurance plans based on user input, ensuring up-to-date information.

- **`InsuranceComparison`:** Allows users to compare selected insurance plans side-by-side for informed decision-making.

---

## Resources

- **Deployed:** [Link](https://health-insurance-assistant.web.app)

- **Video Demonstration:** [Link]

- **UML Diagram:** [Link]

- **Figma Design:** [Link]

- **Business Requirements Document:** [Link](https://github.com/hansama0902/Project2-Health-Insurance-Assistant_Functional-Programming/blob/main/Business%20Requirements/Insure-Clear%20Saver%20Business%20Requirements.pdf)

---

## Functional Programming Examples（filter, map, and reduce）

Three core array methods are highlighted here: filter, map, and reduce.  

---

### 1. Using filter to narrow down plans by tier

#### Functional Code Example

```javascript
if (filters?.tier && filters.tier !== "All Options") {
  plansData = plansData.filter((plan) => plan.tier === filters.tier);
}
```

#### Why this is a good FP practice

- It is declarative and clearly expresses the intent: return only matching plans.
- It avoids side effects and does not mutate the original array.
- Easier to read, maintain, and test.

#### Hypothetical Imperative Example

```javascript
let index = 0;
while (index < plansData.length) {
  if (plansData[index].tier !== filters.tier) {
    plansData.splice(index, 1); // Mutates array during iteration
  } else {
    index++;
  }
}
```

- Mutating the array while iterating can lead to skipped items or logic errors.
- This code is harder to follow and maintain.

---

### 2. Using map to update a specific plan

#### Functional Code Example

```javascript
setPlans((prevPlans) =>
  prevPlans.map((plan) =>
    plan.id === updatedPlan.id ? updatedPlan : plan
  )
);
```

#### Why this is a good FP practice

- Creates a new array rather than modifying the existing one.
- Supports immutability, which is critical in React state updates.
- Cleaner and more predictable than manual mutations.

#### Hypothetical Imperative Example

```javascript
for (let i = 0; i < plans.length; i++) {
  if (plans[i].id === updatedPlan.id) {
    plans[i] = updatedPlan; // Direct mutation of array element
  }
}
setPlans(plans); // May lead to bugs due to shared references
```

- Modifies the existing array directly.
- Can result in React not detecting state changes properly.

---

### 3. Using reduce to synchronize selected plans

#### Functional Code Example

```javascript
const filteredSelected = selectedPlans.reduce((acc, p) => {
  if (plansData.find((plan) => plan.id === p.id)) acc.push(p);
  return acc;
}, []);
```

#### Why this is a good FP practice

- Performs filtering and accumulation in a single pass.
- Avoids external state mutation.
- Works well in cases where chaining filter and map becomes cumbersome.

#### Hypothetical Imperative Example

```javascript
let filteredSelected = [];
for (let i = 0; i < selectedPlans.length; i++) {
  let match = false;
  for (let j = 0; j < plansData.length; j++) {
    if (selectedPlans[i].id === plansData[j].id) {
      match = true;
      break;
    }
  }
  if (match) {
    filteredSelected.push(selectedPlans[i]);
  }
}
```

- Nested loops make the logic more complex and harder to debug.
- Increases time complexity and risk of side effects.

---

## License

This project is licensed under the **MIT License**.
