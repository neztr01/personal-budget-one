// Create the route
const envelopeRouter = require('express').Router();
const budgetingController = require('../controllers/budgetingController');
const middleware = require('../config/middleware');

/* ---------------- Middlewares section ---------------- */

// clean the name before pass to the route
envelopeRouter.use('/:name', middleware.cleanName);
envelopeRouter.post('/', middleware.validateData);


/* ---------------- Request Paths section  ---------------- */

// GET all the envelopes in the DataBase
envelopeRouter.get('/', budgetingController.retrieveEnvelopes);
// GET envelope by specific name
envelopeRouter.get('/:name', budgetingController.getSingleCategory);

// POST creating a new category for envelope
envelopeRouter.post('/', budgetingController.postNewCategory);

// PATCH update specific parameters passed
envelopeRouter.patch('/:name', budgetingController.patchCategory);

// DELETE certain category by name
envelopeRouter.delete('/:name', budgetingController.deleteCategory);


module.exports = envelopeRouter;