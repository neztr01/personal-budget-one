// require the database
const database = require('../config/database');

// initial count of ID
// each time any object is created increment
let idCounter = 1;

/* ------------------------ Controllers section ------------------------ */

// return the entire database
const retrieveAllEnvelopes = () => {
    return database;
}

// Creating new entry in the db

// the first parameter receive a name for the category
// the second gives us the quantity to save into the category
// it doesn't check for valid data only create the category
const createNewCategory = (data) => {

    // create new object with the data entering
    const budgetToAdd = {
        name: data.name,
        amount: data.amount, // amount of money target to this category
        spentAmount: data.spent || 0, // how much is spend at the time, by default is 0
        description: data.description || '', // how, where, and some guidelins is expected to spent the money
        alertThreshold: data.alert || 0, // at what amount of money the user wants to be warn 0 by default
        categoryId: idCounter // each category is assigned an id
    }

    // add the entry within the corresponding name
    database[data.name] = budgetToAdd;

    const categoryCreated = database[data.name];

    // check if the object was added or not
    if(categoryCreated) {

        // update the id counter by one
        idCounter++;

        return categoryCreated;
    } else {

        return false;
    }

}

// get any category by the name
// this function expect a name for the category to get
const getAnyCategoryByName = (name) => {

    // get the database data category
    const category = database[name];

    // if the object category exists return it
    // otherwise just return false
    return category ? category : false; // when any category is asked to get, the function is expected to return the object
}

// helper function for checking if should send back an alert
// if the user set one
// and if the user already cross or reach the threshold
// receive as parameter the name of the category
const reachThreshold = (nameCategory) => {

    // retrieve the category
    const category = getAnyCategoryByName(nameCategory);

    // check if the threshold is set and if already reach it
    const reachThreshold = category.alertThreshold && category.spentAmount
                            >= category.alertThreshold;

    return reachThreshold;
} 


// spend any amount in certain category

// expect a data object which contains:
    // - name: name of the category
    // - amountToSpent: amount to be spent
// return an object when the transaction's completed:
    // spent: how much is already spent
    // saved: the quantity destinated to the category at the beginning
    // alert: when the spent has hit the alert set by the user true || false
// return an object error when the operation fails
const spentAmount = (data) => {

    // get the category asked
    let category = getAnyCategoryByName(data.name);

    // check if spending amout is exceeding budget limit
    const exceedBudgetLimit = (category.spentAmount + data.amountToSpent) > category.amount;

    // check if the exceedBudgetLimit is false
    if(!exceedBudgetLimit) {
        // when false then we can add the amount to spent to the spent amount
        category.spentAmount += data.amountToSpent;

        // check if there's any threshold alert and if it should be sent to user
        const alertThreshold = reachThreshold(data.name);

        // returns an object with the amount saved and the currently spentAmount
        return {spent: category.spentAmount, saved: category.amount, alert: alertThreshold};
    } else {

        return {error: "Budget limit exceeded. Transaction cannot be completed"};
    }

}

// Update any part of the object

// the function receive an object with the parts to update
// and the name of the category
// Object:
    // name: the name of the category to update
    // amount (optional): if want to update the quantity only works if add not subtract
    // description (optional): when want to add any extra description
    // alertThreshold (optional): if want to make it higher or lower : it may send alert within the change
// return the changed object
const updateField = (name, data) => {
    // get the category keys
    const category = getAnyCategoryByName(name);
    // iterate over the data keys
    // update the field by the passed value
    for(let field of Object.keys(category)) {
        // check if the category exists in the data argument
        if(data[field]) {
            // then update that category
            category[field] = data[field];
        }
    }
    // retrieve again the object to return
    if(category) {

        return category;
    } else {

        return false;
    }

}

const deleteByName = (name) => {

    // delete directly from database
    delete database[name];
    
    // return if the category was successfuly deleted
    return !database[name];
}


module.exports = {
    retrieveAllEnvelopes,
    createNewCategory,
    getAnyCategoryByName,
    reachThreshold,
    spentAmount,
    updateField,
    deleteByName
}