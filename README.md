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
### Database Schema

This application uses Firestore with a single collection named `insurance_corp`. Each document in the collection represents an insurance plan with the following schema:

```json
{
  "base_premium": 1000,
  "coverage_deductible": 1000,
  "hospital_coverage": "On Blue System",
  "insurer": "KAISER PERMANENTE2",
  "tier": "Silver"
}
```

---

### Usage of GenAI

Used ChatGPT (GPT-4) to assist with the following functional programming and project design topics:

1. **Component Design & React Hooks**
   - *Prompt:* What are React Hooks, and how can I implement stateful logic using them for a health insurance quote system?

2. **CRUD with Firestore (No Backend)**
   - *Prompt:* How do I implement full CRUD operations on a Firestore collection directly from the frontend using Firebase SDK?

3. **Functional Programming Refactoring**
   - *Prompt:* How to refactor imperative React code to use functional programming principles like map, reduce, and filter properly?

4. **Design Pattern Integration**
   - *Prompt:* Can I use Singleton or Factory Pattern inside a React app using only functional components? Show me an example with insurance plans.

5. **UML Diagram Structuring for Functional Components**
   - *Prompt:* How do I represent functional React components and hooks in a UML-like structure without using class-based inheritance?

---

### CRUD Operations Overview (Firestore Collection: insurance_corp)

- **Create:** New insurance plans are added via `AddInsuranceModal` and stored in Firestore using `addDoc()`.
- **Read:** All plans are fetched in `InsuranceQuoteFetcher` using `getDocs()` and filtered based on user input.
- **Update:** Plans are edited through the modal and updated using `updateDoc()` in Firestore.
- **Delete:** Plans are removed via the delete button using `deleteDoc()`.

---

## Resources

- **Deployed:** [Link](https://health-insurance-assistant.web.app)
- **Demonstrate the Application of Functional Programming:** [Link](https://github.com/hansama0902/Project2-Health-Insurance-Assistant_Functional-Programming/blob/main/functional%20programming%20examples/README.md)

- **Video Demonstration:** [Link]

- **UML Diagram:** [Link]

- **Figma Design:** [Link]

- **Business Requirements Document:** [Link](https://github.com/hansama0902/Project2-Health-Insurance-Assistant_Functional-Programming/blob/main/Business%20Requirements/Insure-Clear%20Saver%20Business%20Requirements.pdf)

---

## License

This project is licensed under the **MIT License**.
