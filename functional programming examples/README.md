# Demonstrate the Application of Functional Programming

## Functional Programming Principles Applied in the Project

This section demonstrates how the five core principles of Functional Programming (FP) are applied in the insurance application project. For each principle, we provide:

**Code Example:**

```js
// utils/premiumCalculator.js
const premiumCalculator = ({ plan, userIncome, userAge }) => {
  let discount = 0;
  let basePremium = Number(plan.base_premium) || 0;
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
```

**Why it’s good FP:**

- No side effects, no state mutation, and output depends only on input.
- Reusable, testable, and predictable.

**Counterexample (hypothetical):**

```js
let log = [];
function impureCalc(x) {
  log.push(x);
  return x * 2;
}
```

**Why it breaks FP:**

- It modifies an external variable (`log`) → side effect.
- Cannot guarantee same result with same input.

---

### 2. Immutability

**Code Example:**

```js
const updatedPlans = plans.filter((plan) => plan.id !== planId);
setPlans(updatedPlans);
```

**Why it’s good FP:**

- It does not mutate the original `plans` array.
- `filter()` returns a new array → immutable data handling.

**Counterexample (hypothetical):**

```js
plans.splice(0, 1);
```

**Why it breaks FP:**

- Mutates the original array directly.
- Can cause unexpected side effects in other parts of the code using `plans`.

---

### 3. First-class Functions

**Code Example:**

```js
const handleDeletePlan = async (planId) => {
  const result = await deleteInsurancePlan(planId);
  if (result.success) {
    ...
  }
};
```

**Why it’s good FP:**

- Functions are treated as values: stored in variables, passed as props, used as arguments.

**Counterexample (hypothetical):**

```js
if (condition) {
  eval("function hidden() { return 42 }");
}
```

**Why it breaks FP:**

- Dynamically defines a function in an unsafe, non-reusable way.
- Hard to pass around or reuse.

---

### 4. Higher-order Functions

**Code Example:**

```js
plans.map((plan) => {
  const calculatedPlan = createCalculatedPlan(plan, userIncome, userAge);
  ...
});
```

**Why it’s good FP:**

- `map()` takes a function as an argument → classic higher-order function.
- Promotes abstraction and clean iteration logic.

**Counterexample (hypothetical):**

```js
let results = [];
for (let i = 0; i < plans.length; i++) {
  results.push(plans[i] * 2);
}
```

**Why it breaks FP:**

- Uses imperative loop instead of function abstraction.
- Harder to compose and reuse logic.

---

### 5. Declarative over Imperative

**Code Example:**

```js
const filteredPlans = plans.filter((p) => p.tier === filters.tier);
```

**Why it’s good FP:**

- You declare what you want: “plans with this tier”.
- No loops, no index manipulation → concise and expressive.

**Counterexample (hypothetical):**

```js
const filtered = [];
for (let i = 0; i < plans.length; i++) {
  if (plans[i].tier === "Gold") filtered.push(plans[i]);
}
```

**Why it breaks FP:**

- Focuses on how to perform the filtering (imperative), rather than what outcome is needed (declarative).
- More error-prone and verbose.

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
  prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)),
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

## Design Patterns Used in the Insurance Application

This section highlights how three core design patterns—**Singleton**, **Factory**, and **Module**—are effectively applied in the insurance application codebase. For each pattern, we provide:

---

### 1. Singleton Pattern

```js
// utils/MediCalPlanSingleton.js
const mediCalPlanSingleton = (() => {
  const plan = {
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

  return {
    getPlan: () => plan,
  };
})();
```

This ensures only **one Medi-Cal plan** exists in memory and is reused throughout the app.  
**Why it's good FP:**

- Avoids side effects: the same data is reused and not recreated.
- Ensures referential transparency—calling `getPlan()` always returns the same object.
- Makes the code predictable and testable.

**Hypothetical Broken Example:**

```js
function getLogger() {
  return { log: (msg) => console.log(msg) };
}
```

**Why it’s a broken Singleton:**

- Every call to getLogger() creates a new object, so logger1 !== logger2.
- Singleton requires a single shared instance across the entire application.
- This breaks consistency and can lead to duplicated state, inefficient memory usage, and hard-to-track bugs in shared logic.

---

### 2. Factory Pattern

```js
import { premiumCalculator } from "./premiumCalculator";

function createCalculatedPlan(plan, userIncome, userAge) {
  const { basePremium, discount, finalPremium, originalPremium } =
    premiumCalculator({
      plan,
      userIncome,
      userAge,
    });

  return {
    ...plan,
    originalPremium,
    basePremium,
    discount,
    finalPremium,
  };
}
export { createCalculatedPlan };
```

```js
{
  plans.map((plan) => {
    const calculatedPlan = createCalculatedPlan(plan, userIncome, userAge);

    const isSelected = selectedPlans.some((p) => p.id === plan.id);
    const isMediCal = plan.special;
  });
}
```

**Why it's good FP:**

- Factory functions are pure: same input → same output.
- Avoids code repetition and encourages immutability by creating new objects.
- Easy to reuse and test.

**Hypothetical Broken Example:**

```js
const car1 = { make: "Honda", wheels: 4 };
const car2 = { make: "Toyota", wheels: 4 };
```

**Why it’s a broken Factory:**

- The object creation logic is manual and duplicated.
- There’s no centralized logic to enforce structure or defaults, leading to inconsistency and repetitive code.
- Factory pattern helps ensure all objects of the same type are created in a uniform and reusable way — which this example lacks.

---

### 3. Module Pattern

```js
import { useState } from "react";
import {
  deleteInsurancePlan,
  updateInsurancePlan,
} from "../utils/insuranceService";

const useInsuranceManager = () => {
  const [selectedPlans, setSelectedPlans] = useState([]);

  const handleSelectPlan = (plan) => {
    setSelectedPlans((prev) => {
      if (prev.some((p) => p.id === plan.id)) {
        return prev.filter((p) => p.id !== plan.id);
      } else if (prev.length < 2) {
        return [...prev, plan];
      } else {
        return prev;
      }
    });
  };

  const handleDeletePlan = async (planId) => {
    const result = await deleteInsurancePlan(planId);
    alert(result.message);
  };

  const handleEditPlan = async (updatedPlan) => {
    const result = await updateInsurancePlan(updatedPlan);
    alert(result.message);
  };

  return {
    selectedPlans,
    setSelectedPlans,
    handleSelectPlan,
    handleDeletePlan,
    handleEditPlan,
  };
};

export default useInsuranceManager;
```

**Why it's good FP:**

- Promotes separation of concerns: each function has a single responsibility.
- Functions are grouped logically and do not rely on global state.
- Enables composition and clear data flow across modules.

**Hypothetical Broken Example:**

```js
window.saveToDisk = () => {};
window.readFromDisk = () => {};
```

---

**Why it’s a broken Module:**

- All functions are attached to the global scope, increasing the risk of name collisions and unintentional overwrites.
- Module pattern promotes encapsulation, scoped variables, and explicit exports, none of which are present here.
- This approach makes testing, reuse, and maintenance harder, especially as the codebase grows.

## License

This project is licensed under the **MIT License**.
