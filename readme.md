# Envelope Budgeting API
- This is a simple Express API for managing envelope budgeting. Envelope budgeting is a method of budgeting where you allocate specific amounts of money for different spending categories, represented as "envelopes".

- This project is PART of the CODECADEMY Back-End Engineer Path. Using Express, version control.

# Installation
1. Clone the repository:

```bash
git clone https://github.com/neztr01/personal-budget-one.git
```

2. Navigate to the project directory:
```bash
cd person-budget-one
```

3. Install dependencies:
```bash
npm install
```

4. Start the server:
```bash
npm start
```

# Routes
- GET all the envelopes in the database
GET /envelopes/
Retrieves all the envelopes stored in the database.

- GET envelope by specific name
GET /envelopes/:name
Retrieves a specific envelope by its name.

- POST creating a new category for envelope
POST /envelopes/
Creates a new category for the envelope.

- PATCH update specific parameters passed
PATCH /envelopes/:name
Updates specific parameters of an existing envelope.

- DELETE certain category by name
DELETE /envelopes/:name
Deletes a specific envelope by its name.

# Controllers
> budgetingController.retrieveEnvelopes: Handles GET request to retrieve all envelopes.
> budgetingController.getSingleCategory: Handles GET request to retrieve a single envelope by its name.
> budgetingController.postNewCategory: Handles POST request to create a new envelope category.
> budgetingController.patchCategory: Handles PATCH request to update specific parameters of an existing envelope.
> budgetingController.deleteCategory: Handles DELETE request to delete a specific envelope by its name.
