// require the database
const database = require('../config/database');

// initial count of ID
// each time any object is created increment
let idCounter = 1;

/* ------------------------ Controllers section ------------------------ */

// Creating new entry in the db

// the first parameter receive a name for the category
// the second gives us the quantity to save into the category
// it doesn't check for valid data only create the category
export const createNewCategory = (data) => {

    // create new object with the data entering
    const budgetToAdd = {
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

        return true;
    } else {

        return false;
    }

}


// get any category by the name
// this function expect a name for the category to get
const getAnyCategory = (name) => {

    // get the database data category
    const category = database[name];

    // if the object category exists return it
    // otherwise just return false
    return category ? category : false; // when any category is asked to get, the function is expected to return the object
}


// spend any amount in certain category

// expect a data object which contains:
    // name of the category
    // amount spent
const spentAmount = (data) => {

    // get the category asked
    let category = getAnyCategory(data.name);

    try {

        category.spentAmount -= data.spent;

    } catch(error) {

    }
}