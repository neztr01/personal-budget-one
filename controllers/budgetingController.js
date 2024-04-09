// require the budget model
const {
    retrieveAllEnvelopes,
    createNewCategory,
    getAnyCategoryByName,
    reachThreshold,
    spentAmount,
    updateField,
    deleteByName
} = require('../models/budgetingModel');


// Send back the entire data in the database
const retrieveEnvelopes = (req, res, next) => {
    res.send(retrieveAllEnvelopes());
};

// Get any category in the databse by receiving name

const getSingleCategory = (req, res, next) => {  
    // retrieve the category and assign to category
    const category = getAnyCategoryByName(req.params.name);

    if(category) {
        res.status(200).send(category);
    } else {
        res.status(400).send("Can't find the Category");
    }
}

// POST a new category
// createNewCategory return the objectCreated or false
const postNewCategory = (req, res, next) => {
    // create a new category passing the body of req
    const createdObject = createNewCategory(req.body);

    if(createdObject) {
        res.send(createdObject);
    } else {
        res.status(400).send("Data does not contain the necessary fields name or amount or both");
    }
}

// Update any specific field in the name category given
const patchCategory = (req, res, next) => {

    // updateField return the object within the category name
    const patchedCategory = updateField(req.params.name, req.body);

    // Check if the object category is valid
    if(patchedCategory) {
        res.send(patchedCategory);
    } else {
        res.status(400).send();
    }
} 


// Delete the specific data category
// deleteByname return true or false
// meaning true when succesfully deleted
// false when not
const deleteCategory = (req, res, next) => {

    // delete the category with name accesed
    const deletedCategory = deleteByName(req.params.name);

    if(deletedCategory) {
        res.status(200).send("Successfully deleted");
    } else {
        res.status(400).send("Category doesn't found");
    }

}


module.exports = {
    retrieveEnvelopes,
    getSingleCategory,
    postNewCategory,
    patchCategory,
    deleteCategory
}