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

This section is part of a larger design and reflection document. It focuses on how functional programming methods are applied using array functions in the InsuranceQuoteFetcher component.

Three core array methods are highlighted here: filter, map, and reduce. For each method, we explain its use in the code, why it is a good application of functional programming (FP), and give a hypothetical non-code example that would break or violate the concept.

---

### 1. Using filter to narrow down plans by tier

#### Code Example

```javascript
if (filters?.tier && filters.tier !== "All Options") {
  plansData = plansData.filter((plan) => plan.tier === filters.tier);
}
```

#### Why this is a good FP practice

- This usage is declarative and clear. It focuses on what we want (filtered plans), not how to loop through them.
- It returns a new array without mutating the original data.
- Functional code like this reduces room for errors and improves readability.

#### Hypothetical non-code example

Imagine you are selecting apples at a grocery store. If you grab every apple and inspect each one by opening it up, then try to tape them back and put some in a basket, the process becomes messy and error-prone.

Instead, using a filter approach is like checking the labels and selecting only the "organic" ones from the shelf without damaging the rest. You keep the selection clean and avoid side effects.

---

### 2. Using map to update a specific plan

#### Code Example

```javascript
setPlans((prevPlans) =>
  prevPlans.map((plan) =>
    plan.id === updatedPlan.id ? updatedPlan : plan
  )
);
```

#### Why this is a good FP practice

- map creates a new array without changing the original one, preserving immutability.
- This aligns perfectly with React's principle of state updates being pure and predictable.
- It’s easy to understand and scale.

#### Hypothetical non-code example

Imagine a classroom of students. One student changes their name. Instead of changing the name tag on each desk one by one, you go through a printed list and only change the entry for the student who updated their info, then reprint the list. That’s what map does: it builds a new version without changing the original data directly.

---

### 3. Using reduce to synchronize selected plans

#### Code Example

```javascript
const filteredSelected = selectedPlans.reduce((acc, p) => {
  if (plansData.find((plan) => plan.id === p.id)) acc.push(p);
  return acc;
}, []);
```

#### Why this is a good FP practice

- reduce is powerful when you want to accumulate or transform data into a new structure.
- In this case, it checks each selected plan and accumulates only the valid ones.
- It avoids nested loops or side-effect-based filtering.

#### Hypothetical non-code example

Think of packing for a trip. You have a checklist of items to bring, but not all of them are currently available in your house. Using reduce is like going through your list and adding only the items that you actually find in your house to the suitcase. You end up with a clean, updated packing list that reflects reality.

---

## License

This project is licensed under the **MIT License**.
